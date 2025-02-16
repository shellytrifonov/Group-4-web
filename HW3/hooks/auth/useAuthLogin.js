/**
 * Custom hook for handling user authentication login flow.
 * Manages login form submission, error handling, and successful login redirection.
 * @returns {Object} Object containing login function and error states for email and password
 */
import { useState } from 'react';
import { useRouter } from 'next/router';

export const useAuthLogin = () => {
  const router = useRouter();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const login = async (formData) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.error) {
        handleLoginError(data.error);
      } else {
        handleLoginSuccess(data);
      }

      return { error: data.error };
    } catch (error) {
      console.error('Login error:', error);
      return { error: 'An unexpected error occurred' };
    }
  };

  const handleLoginError = (error) => {
    if (error === "User not found") {
      setEmailError("User not found");
      setPasswordError("");
    } else if (error === "Incorrect password") {
      setPasswordError("Incorrect password");
      setEmailError("");
    }
  };

  const handleLoginSuccess = (data) => {
    localStorage.setItem("user", JSON.stringify(data.data));
    window.dispatchEvent(new Event("userLoggedIn"));
    router.push("/");
  };

  return { 
    login, 
    emailError, 
    passwordError 
  };
};