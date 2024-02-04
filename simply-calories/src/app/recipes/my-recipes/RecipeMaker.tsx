import React, { useState, useRef, useEffect } from "react";
import { ParsedFood } from "../../../models/ApiResponse";
import AddFoodModal from "../../../components/shared/modals/AddFood/AddFoodModal";
import { useModal } from "../../../hooks/useModal";
import { useSession } from "next-auth/react";
import { saveRecipeData } from "@/app/actions/users/saveRecipeData";
import Image from "next/image";

interface RecipeIngredient extends ParsedFood {
  amount: number;
}

const RecipeMaker: React.FC = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [step, setStep] = useState<number>(1);
  const [recipeName, setRecipeName] = useState<string>("");
  const [recipeImage, setRecipeImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [recipeInstructions, setRecipeInstructions] = useState<string>("");
  const [ingredientName, setIngredientName] = useState<string>("");
  const [selectedFood, setSelectedFood] = useState<ParsedFood | null>(null);
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [inputError, setInputError] = useState<string>("");
  const ingredientInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();

  const handleEditInstructions = () => {
    setStep(2);
  };

  const convertFileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setInputError("");

    try {
      const response = await fetch(
        `/api/food?query=${encodeURIComponent(ingredientName)}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.parsed.length === 0) {
          setInputError("Please enter a valid food item.");
        } else {
          const foodItem = data.parsed[0];
          setSelectedFood(foodItem);
          openModal();
        }
      } else {
        setInputError("Please enter a valid food item.");
      }
    } catch (error) {
      setInputError("An error occurred while searching. Please try again.");
    }
  };

  const handleCalculateOrSave = (amount: number) => {
    if (!selectedFood || !selectedFood.food.nutrients) {
      setInputError("Please enter a valid food item.");
      return;
    }

    const { ENERC_KCAL } = selectedFood.food.nutrients;
    const caloriesForAmountUsed = (ENERC_KCAL * amount) / 100;

    const newIngredient: RecipeIngredient = {
      ...selectedFood,
      amount: amount,
      food: {
        ...selectedFood.food,
        nutrients: {
          ...selectedFood.food.nutrients,
          ENERC_KCAL: caloriesForAmountUsed,
        },
      },
    };

    setIngredients([...ingredients, newIngredient]);
    setTotalCalories((prevTotal) => prevTotal + caloriesForAmountUsed);
    setIngredientName("");
    setInputError("");
    closeModal();
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setRecipeImage(file);

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imageUrl);
    } else {
      setImagePreviewUrl(null);
    }
  };

  useEffect(() => {
    ingredientInputRef.current?.focus();
  }, [ingredients]);

  const handleSubmitRecipe = async () => {
    if (
      !recipeName.trim() ||
      !recipeInstructions.trim() ||
      ingredients.length === 0
    ) {
      console.error("All recipe fields are required.");
      return;
    }

    if (!session?.user?.email) {
      console.error("User must be logged in to submit a recipe.");
      return;
    }

    try {
      const imageBase64 = recipeImage
        ? await convertFileToBase64(recipeImage)
        : undefined;

      const savedRecipe = await saveRecipeData({
        email: session.user.email,
        name: recipeName,
        instructions: recipeInstructions,
        totalCalories: totalCalories,
        ingredients: ingredients.map((ingredient) => ({
          name: ingredient.food.label,
          amount: ingredient.amount,
          calories: ingredient.food.nutrients.ENERC_KCAL,
        })),
        image: imageBase64,
      });

      console.log("Recipe saved successfully:", savedRecipe);
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="pt-8 ">
            <form
              onSubmit={handleSearchSubmit}
              className="flex flex-col gap-2 mb-4"
            >
              <input
                type="text"
                value={ingredientName}
                onChange={(e) => {
                  setIngredientName(e.target.value);
                  setInputError("");
                }}
                placeholder="Ingredient name"
                ref={ingredientInputRef}
                className={`border p-2 rounded-md shadow-sm mb-2 focus:outline-none focus:ring ${
                  inputError ? "border-red-500" : ""
                }`}
                autoFocus
              />
              {inputError && (
                <p className="text-red-500 text-xs italic">{inputError}</p>
              )}
              <div className="pt-1 flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded w-full"
                >
                  Add Ingredient
                </button>
              </div>
            </form>
            <AddFoodModal
              isOpen={isOpen}
              onClose={closeModal}
              onSubmit={handleCalculateOrSave}
            />
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={index} className="flex justify-between">
                  <span>
                    <strong>{`${ingredient.food.label}`}</strong>{" "}
                    {`${ingredient.amount}g`}
                  </span>
                  <span>
                    <strong>{`${Math.round(
                      ingredient.food.nutrients.ENERC_KCAL
                    )} `}</strong>
                    cal
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-center">
              <button
                onClick={handleNextStep}
                disabled={ingredients.length === 0}
                className={`${
                  ingredients.length === 0
                    ? "bg-green-500 text-white opacity-50 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                } p-2 rounded mt-4 transition-colors duration-300 ease-in-out`}
              >
                Next Step
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <p className="font-bold pl-2 py-2">Enter the name of your recipe</p>
            <input
              type="text"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              placeholder="Recipe Name"
              className="border-x-1 p-2  w-full rounded-lg shadow-sm mb-4 focus:outline-none focus:ring"
            />
            <p className="font-bold pl-2 py-2">
              Select an image for your recipe (Optional)
            </p>
            <input
              type="file"
              onChange={handleImageChange}
              className="border-x-1 p-2 mt-2 w-full mb-12 cursor-pointer focus:outline-none focus:ring"
            />

            <textarea
              value={recipeInstructions}
              onChange={(e) => setRecipeInstructions(e.target.value)}
              placeholder="Recipe Instructions"
              className="border-x-1 p-2 mb-2 w-full rounded-lg focus:outline-none focus:ring"
              rows={4}
            />
            <div className="flex justify-center">
              <button
                onClick={handleNextStep}
                disabled={!recipeName.trim() || !recipeInstructions.trim()}
                className={`${
                  !recipeName.trim() || !recipeInstructions.trim()
                    ? "bg-green-500 text-white opacity-50 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                } p-2 rounded mt-4 transition-colors duration-300 ease-in-out`}
              >
                Next Step
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Recipe Overview
            </h2>
            <p className="text-lg font-bold mb-8">
              {recipeName.charAt(0).toUpperCase() + recipeName.slice(1)}
            </p>

            {imagePreviewUrl && (
              <div className="mb-4">
                <Image
                  src={imagePreviewUrl}
                  height={400}
                  width={400}
                  alt="Recipe"
                />
              </div>
            )}

            <div className="mb-2 max-w-sm">
              <h3 className="text-lg font-semibold pb-2 pt-4">Ingredients:</h3>
              <ul className="flex flex-col justify-between">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="mb-2 flex justify-between ">
                    <div className="flex justift-between">
                      <span className="font-semibold">
                        {ingredient.food.label}
                      </span>
                      <span className="ml-2">{`${ingredient.amount}g`}</span>
                    </div>
                    <div className="flex">
                      <span className="font-semibold">{`${Math.round(
                        ingredient.amount *
                          (ingredient.food.nutrients.ENERC_KCAL / 100)
                      )} cal`}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold pb-2 pt-4">
                Total Calories:
              </h3>
              <p className="font-semibold">{`${Math.round(
                totalCalories
              )} cal`}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold py-4">Instructions:</h3>
              <div className="whitespace-pre-line break-words">
                {recipeInstructions}
              </div>

              <button
                onClick={handleEditInstructions}
                className="text-blue-500 underline  mt-2"
              >
                Edit Instructions
              </button>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleSubmitRecipe}
                className="bg-green-500 text-white p-2 rounded mt-4"
              >
                Submit Recipe
              </button>
            </div>
          </div>
        );

      default:
        return <div>Unknown step</div>;
    }
  };

  return <div className="p-4">{renderStepContent()}</div>;
};

export default RecipeMaker;
