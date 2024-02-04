import React from "react";
import { useForm } from "react-hook-form";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
}

interface FormValues {
  amount: string;
}

const AddFoodModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const submitForm = (data: FormValues) => {
    const amount = parseFloat(data.amount);
    if (!isNaN(amount) && amount > 0) {
      onSubmit(amount);
      reset();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-LightUiCol dark:bg-DarkUiCol px-20 py-12 rounded-lg flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold pb-4">Add Food Amount</h2>
        <form onSubmit={handleSubmit(submitForm)} className="w-full max-w-xs">
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
            >
              Amount (g)
            </label>
            <input
              id="amount"
              type="text"
              autoFocus
              {...register("amount", {
                required: "Amount is required",
                pattern: {
                  value: /^[0-9]*\.?[0-9]+$/,
                  message: "Please enter a valid number",
                },
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter amount in grams"
            />
            {errors.amount && (
              <p className="text-red-500 text-xs italic">
                {errors.amount.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Calculate
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

export default AddFoodModal;
