import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { User, Recipe, Ingredient } from "../../../models/User";
import { fetchUserData } from "../../actions/users/fetchUserData";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import Spinner from "@/components/shared/Spinner";

const MyRecipeTab: React.FC = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (!userData && session?.user?.email) {
      console.log("Fetching user data...");
      fetchUserData(session.user.email)
        .then((data) => {
          if (data) {
            setUserData(data);
          } else {
            setError("Failed to fetch user data.");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setError("An error occurred while fetching user data.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [userData, session?.user?.email]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-xl font-bold pb-4 pt-8">My Recipes</h1>
      {selectedRecipe ? (
        <div className="w-full max-w-xl p-4">
          <div className="flex flex-col items-center"></div>
          <h2 className="text-lg font-semibold text-center pb-8">
            {`${selectedRecipe.name
              .charAt(0)
              .toUpperCase()}${selectedRecipe.name.slice(1)}`}
          </h2>
          {selectedRecipe.image && (
            <div className="pb-4">
              <Image
                src={selectedRecipe.image}
                width={300}
                height={300}
                alt={selectedRecipe.name}
                layout="responsive"
                className="my-2"
              />
            </div>
          )}
          <h3 className="font-semibold mb-2">Instructions:</h3>
          <p className="my-2 whitespace-pre-line">
            {selectedRecipe.instructions}
          </p>

          <div className="mt-4">
            <h3 className="font-semibold mb-2 pt-4">Ingredients:</h3>
            <ul>
              {selectedRecipe.ingredients.map((ingredient) => (
                <li key={ingredient.id}>
                  {ingredient.name}: {ingredient.amount}g
                </li>
              ))}
            </ul>
            <p className="py-8 font-semibold">
              Total Calories: {Math.round(selectedRecipe.totalCalories)}
            </p>
          </div>
          <div className="flex flex-row justify-center items-center pb-8 hover:text-LightTextCol2 dark:hover:text-DarkTextCol2">
            <FaArrowLeft />
            <button onClick={() => setSelectedRecipe(null)} className=" pl-2 ">
              Back
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-12 pt-4">
          {userData?.recipes?.length ? (
            userData.recipes.map((recipe: Recipe) => (
              <div
                key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
                className="cursor-pointer border dark:border-DarkbgCol rounded-lg overflow-hidden shadow-lg hover:shadow-xl"
              >
                <div className="w-64 h-40 relative">
                  {recipe.image ? (
                    <Image
                      src={recipe.image}
                      layout="fill"
                      objectFit="cover"
                      alt={recipe.name}
                    />
                  ) : (
                    <div className="bg-gray-200 dark:bg-DarkUiCol flex items-center justify-center w-full h-full">
                      No Image
                    </div>
                  )}
                </div>
                <div className="w-64  p-1 dark:bg-DarkUiCol/80">
                  <h3 className="font-semibold text-center my-4">
                    {`${recipe.name.charAt(0).toUpperCase()}${recipe.name.slice(
                      1
                    )}`}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-3">
              <p className="text-center font-semibold">No recipes found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyRecipeTab;
