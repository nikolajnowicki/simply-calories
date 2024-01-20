import React from "react";

type FormFieldProps = {
  label: string;
  type: string;
  error?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  error,
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  className = "",
}) => {
  return (
    <div className={`mb-2 ${className}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-LightTextCol dark:text-DarkTextCol pb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`px-3 py-1 border rounded-md shadow-sm  md:w-72 focus:outline-none focus:ring focus:border-primary ${
          error ? "border-red-500" : "border-gray-300 dark:border-DarkUiCol"
        }`}
      />
      <div className="min-h-[20px] mt-1">
        {error ? (
          <p className="text-red-500 text-xs flex">{error}</p>
        ) : (
          <div className="h-5"></div>
        )}
      </div>
    </div>
  );
};

export default FormField;
