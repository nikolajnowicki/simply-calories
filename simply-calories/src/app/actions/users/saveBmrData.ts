"use server";

import prisma from "@/app/lib/prisma";

interface SaveBmrDataParams {
  email: string;
  height: number;
  weight: number;
  gender: string;
  activityLevel: string;
  tdee: number;
  deficitLevel10: number;
  deficitLevel20: number;
  deficitLevel30: number;
  calculatedValueCalories10: number;
  calculatedValueKilos10: number;
  calculatedValueCalories20: number;
  calculatedValueKilos20: number;
  calculatedValueCalories30: number;
  calculatedValueKilos30: number;
}

export const saveBmrData = async ({
  email,
  height,
  weight,
  gender,
  activityLevel,
  tdee,
  deficitLevel10,
  deficitLevel20,
  deficitLevel30,
  calculatedValueCalories10,
  calculatedValueKilos10,
  calculatedValueCalories20,
  calculatedValueKilos20,
  calculatedValueCalories30,
  calculatedValueKilos30,
}: SaveBmrDataParams) => {
  try {
    const bmrResult = await prisma.bMRResult.create({
      data: {
        user: { connect: { email: email } },
        height,
        weight,
        gender,
        activityLevel,
        tdee,
        deficitLevel10,
        deficitLevel20,
        deficitLevel30,
        calculatedValueCalories10,
        calculatedValueKilos10,
        calculatedValueCalories20,
        calculatedValueKilos20,
        calculatedValueCalories30,
        calculatedValueKilos30,
      },
    });

    return bmrResult;
  } catch (error) {
    console.error("Error saving BMR data:", error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred while saving BMR data");
    }
  }
};
