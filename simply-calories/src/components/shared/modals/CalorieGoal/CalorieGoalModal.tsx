import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUserData } from "../../../../hooks/useUserData";
import { saveCaloricGoal } from "../../../../app/actions/users/saveCaloricGoal";
import Spinner from "@/components/shared/Spinner";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  caloricGoal: string;
}

const CalorieGoalModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const userInfo = useUserData();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  useEffect(() => {
    if (userInfo) {
      setLoading(false);
    }
  }, [userInfo, setValue]);

  const onSubmit = async (data: FormValues) => {
    const caloricGoal = parseFloat(data.caloricGoal);
    if (!isNaN(caloricGoal) && userInfo) {
      try {
        await saveCaloricGoal({
          email: userInfo.email,
          caloricGoal: caloricGoal,
        });
        reset();
        onClose();
      } catch (error) {
        console.error("Error saving caloric goal:", error);
      }
    } else {
      console.error(
        "User info is not available or caloric goal is not a number."
      );
    }
  };

  if (!isOpen) return null;
  if (loading) return <Spinner />;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-LightUiCol dark:bg-DarkUiCol px-20 py-12 rounded-lg flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold pb-4">Set Caloric Goal</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xs">
          <div className="mb-4">
            <label
              htmlFor="caloricGoal"
              className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
            >
              Caloric Goal
            </label>
            <input
              id="caloricGoal"
              type="number"
              {...register("caloricGoal", {
                required: "Caloric goal is required",
                validate: (value) =>
                  parseFloat(value) > 0 ||
                  "Please enter a valid number greater than 0",
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your caloric goal"
            />
            {errors.caloricGoal && (
              <p className="text-red-500 text-xs italic">
                {errors.caloricGoal.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Goal
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CalorieGoalModal;
