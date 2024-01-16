import React, { useState } from "react";
import FormField from "../../input/FormField";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<"login" | "forgotPassword">("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleForgotPasswordClick = () => {
    setStep("forgotPassword");
  };

  const handleBackToLoginClick = () => {
    setStep("login");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white px-20 py-12 rounded-lg  flex flex-col items-center justify-center ">
        {step === "login" ? (
          <>
            <h2 className="text-lg font-bold">Login</h2>
            <form onSubmit={handleSubmit}>
              <FormField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />

              <FormField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />

              <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-4 mt-2"
              >
                Login
              </button>
            </form>
            <button onClick={onClose}>Close</button>
            <p onClick={handleForgotPasswordClick}>Forgot your password?</p>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold">Forgot Your Password?</h2>
            <p>Enter your email to reset your password.</p>
            <form>
              <FormField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </form>
            <button onClick={handleBackToLoginClick}>Back to Login</button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
