"use server";
import prisma from "@/app/lib/prisma";

interface IngredientInput {
  name: string;
  amount: number;
  calories: number;
}

interface SaveRecipeParams {
  email: string;
  name: string;
  instructions: string;
  totalCalories: number;
  ingredients: IngredientInput[];
  image?: string;
}

export const saveRecipeData = async ({
  email,
  name,
  instructions,
  totalCalories,
  ingredients,
  image,
}: SaveRecipeParams) => {
  try {
    const recipeResult = await prisma.recipe.create({
      data: {
        user: { connect: { email: email } },
        name,
        instructions,
        totalCalories,
        ingredients: {
          createMany: {
            data: ingredients.map((ingredient) => ({
              name: ingredient.name,
              amount: ingredient.amount,
              calories: ingredient.calories,
            })),
          },
        },
        image: image || null,
      },
    });

    return recipeResult;
  } catch (error) {
    console.error("Error saving recipe data:", error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred while saving recipe data");
    }
  }
};
