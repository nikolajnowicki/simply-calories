import React from "react";
import { useFormContext } from "react-hook-form";

type FormFieldBmrProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  unit?: string;
  min?: number;
  max?: number;
};

const FormFieldBmr: React.FC<FormFieldBmrProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  unit,
  min,
  max,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-LightTextCol dark:text-DarkTextCol mb-2 pt-4"
      >
        {label}
      </label>
      <div className="flex items-center">
        <input
          {...register(name, {
            required: `${label} is required`,
            min:
              min !== undefined
                ? { value: min, message: `Minimum ${label} is ${min}` }
                : undefined,
            max:
              max !== undefined
                ? { value: max, message: `Maximum ${label} is ${max}` }
                : undefined,
            valueAsNumber: type === "number",
          })}
          id={name}
          type={type}
          placeholder={placeholder}
          className={`appearance-none px-3 py-2 border max-w-96 ${
            errors[name]
              ? "border-red-500"
              : "border-gray-300 dark:border-DarkUiCol"
          } rounded-md shadow-sm focus:outline-none focus:ring focus:border-primary w-full`}
        />
        {unit && <span className="ml-2 text-sm text-gray-500">{unit}</span>}
      </div>
      {errorMessage && (
        <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default FormFieldBmr;
