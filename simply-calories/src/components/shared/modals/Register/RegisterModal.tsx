import React, { useState } from "react";
import FormField from "../../input/FormField";
import { signUp } from "@/app/actions/users/signUp";
import { RegisterButton } from "@/components/desktop/NavBar/RegisterButton";
import Spinner from "../../Spinner";
import {
  validateRegistration,
  FormData,
  FormErrors,
} from "../../../../utils/validation/validateRegistration";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<"register" | "confirmation">("register");
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    const newErrors = validateRegistration({ ...formData, [name]: value });
    setFormErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const errors = validateRegistration(formData);
    setFormErrors(errors);

    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      setIsLoading(false);
      return;
    }

    try {
      const result = await signUp(
        formData.username,
        formData.password,
        formData.email
      );

      if (result.includes("Successfully created")) {
        setStep("confirmation");
      } else {
        const errorMessage =
          typeof result === "string"
            ? result
            : "An error occurred. Please try again.";
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          general: errorMessage,
        }));
      }
    } catch (error) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        general: "An error occurred. Please try again.",
      }));
    }

    setIsLoading(false);
  };

  const handleClose = () => {
    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
    setFormErrors({});
    setIsLoading(false);
    setStep("register");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-LightUiCol2 dark:bg-DarkUiCol px-20 py-12 rounded-lg flex flex-col items-center justify-center">
        {step === "register" && (
          <>
            <h2 className="text-lg font-bold pb-8">Register</h2>
            <form onSubmit={handleSubmit} className="w-full">
              <FormField
                label="Username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                error={formErrors.username}
              />
              <FormField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                error={formErrors.email}
              />
              <FormField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                error={formErrors.password}
              />
              <FormField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                error={formErrors.confirmPassword}
              />
              {isLoading ? (
                <Spinner />
              ) : (
                <div className="flex justify-between pt-4">
                  <RegisterButton text="Register" />
                  <button
                    onClick={handleClose}
                    className="text-red-700 border-b-1 hover:text-textError"
                  >
                    Close
                  </button>
                </div>
              )}
            </form>
            <div className="text-center  pt-8 pb-0 m-0 p-0">
              <p className="text-red-500">{formErrors.general || ""}</p>
            </div>
          </>
        )}
        {step === "confirmation" && (
          <>
            <p className="text-center">
              {formErrors.general
                ? formErrors.general
                : "User successfully created."}
            </p>
            <button
              onClick={handleClose}
              className="mt-4 text-red-700  pt-8 hover:text-textError"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterModal;
