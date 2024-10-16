"use server";

import fs from "fs";
import path from "path";
import { LanguagesToExtension } from "./types";

const MOUNT_PATH = path.resolve("src", "problems");

export const getProblem = async (problemSlug, languageId) => {
  languageId = LanguagesToExtension[languageId];
  const fullBoilderPlate = await getProblemFullBoilerplateCode(
    problemSlug,
    languageId
  );

  const inputs = await getProblemInputs(problemSlug);
  const outputs = await getProblemOutputs(problemSlug);

  return {
    id: problemSlug,
    fullBoilerplateCode: fullBoilderPlate,
    inputs: inputs,
    outputs: outputs,
  };
};

async function getProblemFullBoilerplateCode(problemSlug, languageId) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.resolve(
        MOUNT_PATH,
        problemSlug,
        "boilerplate-full",
        `function.${languageId}`
      ),
      // `${MOUNT_PATH}/${problemSlug}/boilerplate-full/function.${languageId}`,
      { encoding: "utf-8" },
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      }
    );
  });
}

async function getProblemInputs(problemSlug) {
  return new Promise((resolve, reject) => {
    fs.readdir(
      path.resolve(MOUNT_PATH, problemSlug, "tests", `inputs`),
      // `${MOUNT_PATH}/${problemSlug}/tests/inputs`,
      async (err, files) => {
        if (err) {
          console.log(err);
        } else {
          await Promise.all(
            files.map((file) => {
              return new Promise((resolve, reject) => {
                fs.readFile(
                  path.resolve(
                    MOUNT_PATH,
                    problemSlug,
                    "tests",
                    "inputs",
                    `${file}`
                  ),
                  // `${MOUNT_PATH}/${problemSlug}/tests/inputs/${file}`,
                  { encoding: "utf-8" },
                  (err, data) => {
                    if (err) {
                      reject(err);
                    }
                    resolve(data);
                  }
                );
              });
            })
          )
            .then((data) => {
              resolve(data);
            })
            .catch((e) => reject(e));
        }
      }
    );
  });
}

async function getProblemOutputs(problemSlug) {
  return new Promise((resolve, reject) => {
    fs.readdir(
      path.resolve(MOUNT_PATH, problemSlug, "tests", "outputs"),
      // `${MOUNT_PATH}/${problemSlug}/tests/outputs`,
      async (err, files) => {
        if (err) {
          console.log(err);
        } else {
          await Promise.all(
            files.map((file) => {
              return new Promise((resolve, reject) => {
                fs.readFile(
                  path.resolve(
                    MOUNT_PATH,
                    problemSlug,
                    "tests",
                    "outputs",
                    `${file}`
                  ),
                  // `${MOUNT_PATH}/${problemSlug}/tests/outputs/${file}`,
                  { encoding: "utf-8" },
                  (err, data) => {
                    if (err) {
                      reject(err);
                    }
                    resolve(data);
                  }
                );
              });
            })
          )
            .then((data) => {
              resolve(data);
            })
            .catch((e) => reject(e));
        }
      }
    );
  });
}
