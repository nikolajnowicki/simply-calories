"use server";

import prisma from "@/app/lib/prisma";

interface SaveCaloricGoalParams {
  email: string;
  caloricGoal: number;
}

export const saveCaloricGoal = async ({
  email,
  caloricGoal,
}: SaveCaloricGoalParams) => {
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { caloricGoal },
    });

    return user;
  } catch (error) {
    console.error("Error saving caloric goal:", error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred while saving caloric goal");
    }
  }
};
