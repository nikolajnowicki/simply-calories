"use server";
import prisma from "@/app/lib/prisma";

interface SaveFoodConsumptionParams {
  email: string;
  foodName: string;
  amount: number;
  calories: number;
  dateConsumed: Date;
}

export const saveFoodConsumptionData = async ({
  email,
  foodName,
  amount,
  calories,
  dateConsumed,
}: SaveFoodConsumptionParams) => {
  try {
    const foodConsumptionResult = await prisma.foodConsumption.create({
      data: {
        user: { connect: { email: email } },
        foodName,
        amount,
        calories,
        dateConsumed,
      },
    });

    return foodConsumptionResult;
  } catch (error) {
    console.error("Error saving food consumption data:", error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(
        "An unknown error occurred while saving food consumption data"
      );
    }
  }
};
