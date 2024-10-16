"use server";

import prisma from "@/db";
import { Difficulty, Status } from "@prisma/client";

export const addSubmission = async (email, problemId, status, difficulty) => {
  const user = await getUser(email);
  if (!user?.id || !problemId || !status) {
    return { message: "Does not have userId, problemId, status" };
  }
  try {
    const addPoints =
      difficulty === Difficulty.EASY
        ? 15
        : difficulty === Difficulty.MEDIUM
        ? 30
        : 50;

    if (status === Status.AC) {
      await prisma.problem.update({
        where: {
          id: problemId,
        },
        data: {
          lastSolverId: user.id,
        },
      });

      const previousSubmission = await prisma.submission.findFirst({
        where: {
          userId: user.id,
          problemId: problemId,
          status: Status.AC,
        },
      });

      if (!previousSubmission) {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            points: user.points + addPoints,
          },
        });
      }
    }

    const submission = await prisma.submission.create({
      data: {
        userId: user.id ?? null,
        problemId: problemId ?? null,
        status,
      },
    });

    return {
      success: true,
      message: "Submission added successfully",
      submission,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to add submission",
    };
  }
};

export const getUser = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return null;
  }
  return user;
};
