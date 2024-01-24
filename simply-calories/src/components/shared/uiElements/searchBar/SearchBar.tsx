import { IoSearchSharp } from "react-icons/io5";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const { handleSubmit, control } = useForm();

  const handleFormSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const query = formData.query;

    try {
      const response = await fetch(
        `/api/food?query=${encodeURIComponent(query)}`
      );
      if (response.ok) {
        const data = await response.json();
        onSubmit(data);
      } else {
        console.error("Server error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="relative flex items-center pt-3 pb-2 z-5 mx-auto">
        <div className="relative flex-grow my-2">
          <Controller
            name="query"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="bg-LightUiCol dark:bg-DarkbgCol/70 border-1 border-LightUiCol focus:border-blue-500/20 rounded-xl py-3 px-6 pr-12 leading-tight focus:outline-none w-full"
                placeholder="Search for food..."
              />
            )}
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-LightTextCol dark:text-DarkTextCol"
          >
            <IoSearchSharp className="text-3xl" />
          </button>
        </div>
      </div>
    </form>
  );
};
