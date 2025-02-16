// hooks/auth/useForm.js
import { useState } from 'react';

/**
 * Custom hook for managing form state and input handling.
 * Supports both regular input fields and checkbox inputs for food preferences.
 * @param {Object} initialState - Initial form data state
 * @returns {Object} Object containing form data and handler functions
 */
export const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      foodPreferences: checked 
        ? [...prev.foodPreferences, value]
        : prev.foodPreferences.filter(pref => pref !== value)
    }));
  };

  return { formData, handleInputChange, handleCheckboxChange };
};