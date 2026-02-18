"use server";
import prisma from "@/db";

const deleteProblems = async () => {
  try {
    await prisma.problem.deleteMany({});
    return { success: true };
  } catch (error) {
    console.log("Error while deleting all problems", error);
    return { success: false };
  }
};

export default deleteProblems;
