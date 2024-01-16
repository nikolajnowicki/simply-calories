export interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export const validateRegistration = (formData: FormData): FormErrors => {
  let errors: FormErrors = {};

  if (!formData.username) {
    errors.username = "Username is required.";
  } else if (formData.username.length < 3) {
    errors.username = "Username must be at least 3 characters long.";
  } else if (formData.username.length > 15) {
    errors.username = "Username must not exceed 15 characters.";
  }

  if (!formData.email) {
    errors.email = "Email is required.";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format.";
    }
  }

  if (!formData.password) {
    errors.password = "Password is required.";
  } else if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  } else if (formData.password.length > 32) {
    errors.password = "Password must not exceed 32 characters.";
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
};
