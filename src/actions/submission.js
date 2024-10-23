"use server";

import { NextResponse } from "next/server";
import axios from "axios";
import { LanguagesToNumber } from "@/actions/types";
import Problems from "@/lib/Problems";

export async function submission(
  code,
  languageId,
  problemSlug,
  testcasesLength
) {
  const problem = Problems.filter((problem) => problem.slug === problemSlug)[0];

  const completeProblem = { inputs: [], outputs: [] };
  problem.testcases.map(({ inputs, output }) => {
    completeProblem.inputs.push(inputs);
    completeProblem.outputs.push(output);
  });

  if (!problem) {
    return {
      success: false,
      message: "Problem not found!...",
    };
  }

  let boilerCode = problem.fullBoilerCode[languageId];

  boilerCode = boilerCode.replace("USER_CODE_HERE", code);

  const sourceCodes = [];
  problem.testcases.map((testcase, idx) => {
    if (idx < testcasesLength || testcasesLength === -1) {
      let code = boilerCode;
      testcase.inputs.map((input, idx) => {
        code = code.replace(`input_${idx}`, input);
      });
      sourceCodes.push(code);
    }
  });

  const createSubmissionOptions = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
    params: {
      base64_encoded: "false",
    },
    headers: {
      "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
      "x-rapidapi-host": process.env.X_RAPIDAPI_HOST,
      "Content-Type": "application/json",
    },
    data: {
      submissions: sourceCodes.map((code, idx) => ({
        language_id: LanguagesToNumber[languageId],
        source_code: code,
        expected_output: problem.testcases[idx].output,
      })),
    },
  };

  try {
    const response = await axios.request(createSubmissionOptions);
    const tokenArray = [];
    response.data.map((tokenObj) => {
      tokenArray.push(tokenObj.token);
    });
    const tokens = tokenArray.join(",");
    if (!tokens) {
      return NextResponse.json({
        success: false,
        message: "ERROR! while creating submission",
      });
    }
    const result = await checkBatchStatus(tokens);
    return { result, completeProblem };
  } catch (e) {
    console.log("Error while creating submission", e?.response?.data || e);
    return NextResponse.json({
      success: false,
      message: "ERROR! while submission...",
    });
  }
}

const checkBatchStatus = async (tokens) => {
  try {
    const submissions = await getSubmission(tokens);
    let inProgress = false;
    submissions.forEach((submission) => {
      if (
        submission.status.description === "In Queue" ||
        submission.status.description === "Processing"
      ) {
        inProgress = true;
      }
    });

    if (inProgress) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(checkBatchStatus(tokens)), 2000);
      });
    } else {
      return submissions;
    }
  } catch (error) {
    console.error("Error fetching batch statuses:", error);
    return [];
  }
};

const getSubmission = async (tokens) => {
  const options = {
    method: "GET",
    url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
    params: {
      tokens: tokens,
      base64_encoded: "false",
      fields: "*",
    },
    headers: {
      "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
      "x-rapidapi-host": process.env.X_RAPIDAPI_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.submissions;
  } catch (error) {
    console.error("ERROR! while getting Submission", error);
  }
};
