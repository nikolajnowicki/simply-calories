import React, { useState } from "react";
import FormField from "../../input/FormField";
import { signIn } from "next-auth/react";
import Spinner from "../../Spinner";
import { LogInButton } from "@/components/desktop/NavBar/LoginButton";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const signInResponse = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (!signInResponse || signInResponse.ok !== true) {
        setMessage("Invalid credentials");
      } else {
        onClose();
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-LightUiCol dark:bg-DarkUiCol px-20 py-12 rounded-lg flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold pb-8">Login</h2>
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

          {isLoading ? (
            <Spinner />
          ) : (
            <div className="flex justify-between pt-4">
              <LogInButton text="Login" type="submit" />
              <button
                onClick={onClose}
                className=" text-red-700   hover:text-textError"
              >
                Close
              </button>
            </div>
          )}
        </form>
        <p className="pt-4 text-textError ">{message}</p>{" "}
      </div>
    </div>
  );
};

export default LoginModal;
