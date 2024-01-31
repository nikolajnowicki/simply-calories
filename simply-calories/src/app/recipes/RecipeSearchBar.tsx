import React from "react";
import { useForm, Controller } from "react-hook-form";
import { IoSearchSharp } from "react-icons/io5";

interface FormData {
  query: string;
}

interface RecipeSearchBarProps {
  setRecipes: React.Dispatch<React.SetStateAction<any>>;
  clearSelection: () => void;
}

const RecipeSearchBar: React.FC<RecipeSearchBarProps> = ({
  setRecipes,
  clearSelection,
}) => {
  const { handleSubmit, control, reset } = useForm<FormData>();

  const handleFormSubmit = async (data: FormData) => {
    const apiURL = `/api/recipe?query=${encodeURIComponent(data.query)}`;

    try {
      const response = await fetch(apiURL);

      if (response.ok) {
        const jsonData = await response.json();
        setRecipes(jsonData);
      } else {
        console.error("Server error:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }

    reset();
    clearSelection();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full max-w-xl mx-auto pb-8 px-4"
    >
      <div className="relative flex items-center w-full">
        <Controller
          name="query"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Search for recipes..."
              className="w-full p-3 pl-5 pr-10 text-base border-none rounded-lg focus:outline-none focus:border-blue-500"
            />
          )}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center px-4 text-white bg-blue-500 dark:bg-DarkbgCol/90 rounded-r-lg"
        >
          <IoSearchSharp className="text-lg" />
        </button>
      </div>
    </form>
  );
};

export default RecipeSearchBar;
