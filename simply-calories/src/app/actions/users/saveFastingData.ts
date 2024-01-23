"use server";

import prisma from "@/app/lib/prisma";

interface SaveFastingDataParams {
  email: string;
  fastingDuration: string;
}

export const saveFastingData = async ({
  email,
  fastingDuration,
}: SaveFastingDataParams) => {
  try {
    const fastingResult = await prisma.fastingResult.create({
      data: {
        user: { connect: { email: email } },
        fastingDuration,
      },
    });

    return fastingResult;
  } catch (error) {
    console.error("Error saving fasting data:", error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred while saving fasting data");
    }
  }
};
