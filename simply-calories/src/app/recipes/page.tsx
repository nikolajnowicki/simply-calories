"use client";
import React, { useState } from "react";
import RecipeSearchBar from "./RecipeSearchBar";
import Image from "next/image";
import { FaCircle } from "react-icons/fa";

interface Nutrient {
  label: string;
  tag: string;
  total: number;
}
function formatIngredient(ingredient: string): string {
  return ingredient.replace(/(\d+)\.0+/g, "$1");
}

const Recipes = () => {
  const [recipes, setRecipes] = useState<any>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

  const handleRecipeClick = (recipe: any) => {
    setSelectedRecipe(recipe);
  };

  const clearSelectedRecipe = () => {
    setSelectedRecipe(null);
  };

  const handleKeyPress = (event: React.KeyboardEvent, recipe: any) => {
    if (event.key === "Enter") {
      handleRecipeClick(recipe);
    }
  };

  return (
    <div className="flex flex-grow bg-#6082B6 rounded-md w-full pb-0 sm:max-w-[700px] lg:max-w-[1024px] xl:max-w-[1280px]">
      <div className="flex flex-col items-center w-full h-auto rounded-t-xl shadow-xl bg-LightUiCol2 dark:bg-DarkUiCol/60 pb-8">
        <h1 className="text-xl font-bold pt-12 pb-4">Recipes</h1>
        <RecipeSearchBar
          setRecipes={setRecipes}
          clearSelection={clearSelectedRecipe}
        />
        <div className="px-4 ">
          {selectedRecipe ? (
            <div className="flex  flex-col items-center bg-white dark:bg-DarkbgCol/60 rounded-lg shadow p-4">
              <div>
                <div className="flex flex-col md:flex-row sm:w-[600px] lg:w-[800px] ">
                  <div className="flex justify-center md:w-1/3 pb-8 lg:pb-0 lg:pt-10 lg:pr-6 ">
                    <Image
                      src={selectedRecipe.recipe.image}
                      alt={selectedRecipe.recipe.label}
                      width={300}
                      height={300}
                      className="rounded-md"
                    />
                  </div>

                  <div className="md:w-2/3 flex flex-col justify-center items-center">
                    <h2 className="font-bold  text-center pb-6 py-4  ">
                      {selectedRecipe.recipe.label}
                    </h2>
                    <div className="flex flex-wrap items-center justify-center h-auto gap-1 md:gap-2 lg:gap-3">
                      {selectedRecipe.recipe.healthLabels.map(
                        (label: string, index: number) => (
                          <span
                            key={index}
                            className="px-1 py-1 text-xs flex items-center"
                          >
                            <FaCircle className="text-[0.5rem] mr-1" /> {label}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center lg:flex-row w-full mt-12 mb-4 ">
                <div className="text-2xl sm:w-1/3 flex flex-col justify-center items-center pb-8 lg:pb-0 ">
                  <p className="font-bold">
                    {Math.round(selectedRecipe.recipe.calories)} Cal
                  </p>
                  <p>{selectedRecipe.recipe.yield} servings</p>
                </div>
                <div className="lg:w-1/3 w-5/6 sm:w-72 flex flex-col justify-center pl-12">
                  <div className="flex items-center mb-2 pr-12">
                    <span className="w-3 h-3 bg-green-500 rounded-full inline-block mr-2"></span>
                    <p className="font-semibold">PROTEIN</p>
                    <p className="font-bold ml-auto">
                      {selectedRecipe.recipe.digest
                        .find(
                          (nutrient: Nutrient) => nutrient.label === "Protein"
                        )
                        ?.total.toFixed(0)}{" "}
                      g
                    </p>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full inline-block mr-2"></span>
                    <p className="font-semibold">FAT</p>
                    <p className="font-bold ml-auto pr-12">
                      {selectedRecipe.recipe.digest
                        .find((nutrient: Nutrient) => nutrient.label === "Fat")
                        ?.total.toFixed(0)}{" "}
                      g
                    </p>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full inline-block mr-2"></span>
                    <p className="font-semibold">CARB</p>
                    <p className="font-bold ml-auto pr-12">
                      {selectedRecipe.recipe.digest
                        .find(
                          (nutrient: Nutrient) => nutrient.label === "Carbs"
                        )
                        ?.total.toFixed(0)}{" "}
                      g
                    </p>
                  </div>
                </div>
                <div className="lg:w-1/3 flex flex-col justify-center items-center">
                  <h3 className="font-bold text-lg pb-4 pt-8 lg:pt-0">
                    Ingredients
                  </h3>
                  <ul className="text-center pb-8 lg:pd-0">
                    {selectedRecipe.recipe.ingredientLines.map(
                      (ingredient: string, index: number) => (
                        <li key={index} className="mb-1 text-sm">
                          {formatIngredient(ingredient)}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
              <div className="pb-4 lg:pb-8">
                <button
                  onClick={clearSelectedRecipe}
                  className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md"
                >
                  Return to Results
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
              {recipes &&
                recipes.hits &&
                recipes.hits.map((hit: any, index: number) => (
                  <div
                    tabIndex={0}
                    onClick={() => handleRecipeClick(hit)}
                    onKeyDown={(e) => handleKeyPress(e, hit)}
                    className="focus:outline-none focus:ring-2 focus:ring-blue-300 flex flex-col items-center bg-white dark:bg-DarkbgCol/60 rounded-lg shadow p-4 cursor-pointer"
                    key={index}
                  >
                    <p className="font-bold pb-3">{hit.recipe.label}</p>
                    <Image
                      src={hit.recipe.image}
                      alt={hit.recipe.label}
                      width={200}
                      height={200}
                      className="rounded-md"
                    />
                    <div className="mt-2 text-center">
                      <p className="font-bold pt-4 pb-2">
                        {Math.round(hit.recipe.calories)} Cal
                      </p>
                      <p>{hit.recipe.yield} Servings</p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recipes;
