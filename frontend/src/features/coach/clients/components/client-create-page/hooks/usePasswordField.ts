import { useState, useCallback } from "react";
import { UseFormSetValue } from "react-hook-form";
import { CreateClientFormData } from "../../../schemas/create-client.schema";

const PASSWORD_LENGTH = 12;
const PASSWORD_CHARSET =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";

export function usePasswordField(
  setValue: UseFormSetValue<CreateClientFormData>
) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const generateRandomPassword = useCallback((): string => {
    let password = "";
    for (let i = 0; i < PASSWORD_LENGTH; i++) {
      password += PASSWORD_CHARSET.charAt(
        Math.floor(Math.random() * PASSWORD_CHARSET.length)
      );
    }
    return password;
  }, []);

  const handleGeneratePassword = useCallback(() => {
    const newPassword = generateRandomPassword();
    setShowPassword(true);
    setShowConfirmPassword(true);
    setValue("password", newPassword, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("confirmPassword", newPassword, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [generateRandomPassword, setValue]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  return {
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleGeneratePassword,
  };
}
