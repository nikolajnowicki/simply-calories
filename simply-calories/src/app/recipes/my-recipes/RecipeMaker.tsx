import React, { useState, useRef, useEffect } from "react";
import { ParsedFood } from "../../../models/ApiResponse";
import AddFoodModal from "../../../components/shared/modals/AddFood/AddFoodModal";
import { useModal } from "../../../hooks/useModal";

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

  const handleEditInstructions = () => {
    setStep(2);
  };

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
    const calories = amount * (ENERC_KCAL / 100);
    const newIngredient: RecipeIngredient = { ...selectedFood, amount };
    setIngredients([...ingredients, newIngredient]);
    setTotalCalories(totalCalories + calories);
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

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
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
                <li
                  key={index}
                  className="flex flex-col md:flex-row md:justify-between items-center space-y-1 md:space-y-0 space-x-0 md:space-x-4 mb-2"
                >
                  <div className="md:flex-1 flex items-baseline">
                    <span className="font-semibold mr-1">
                      {ingredient.food.label}
                    </span>
                    <span>{`${ingredient.amount}g`}</span>
                  </div>
                  <span className="font-semibold md:flex-none whitespace-nowrap">{`${Math.round(
                    ingredient.amount *
                      (ingredient.food.nutrients.ENERC_KCAL / 100)
                  )}cal`}</span>
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
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Recipe Overview</h2>
            <p className="text-lg mb-2">{recipeName}</p>

            {imagePreviewUrl && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Image Preview:</h3>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreviewUrl}
                  alt="Recipe"
                  className="max-w-full h-auto"
                />
              </div>
            )}

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

            <div className="mb-4">
              <h3 className="text-lg font-semibold py-4 ">Ingredients:</h3>
              <ul className="flex flex-col justify-between">
                {ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="mb-2 flex justify-between md:justify-normal md:gap-16"
                  >
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

            <button className="bg-green-500 text-white p-2 rounded mt-4">
              Submit Recipe
            </button>
          </div>
        );

      default:
        return <div>Unknown step</div>;
    }
  };

  return <div className="p-4">{renderStepContent()}</div>;
};

export default RecipeMaker;
