/**
 * Custom hook for managing recipe nutrition information
 * Handles updating nutrition values and validation
 */
import { useState } from 'react';

export const useNutrition = () => {
  const [nutrition, setNutrition] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });

  const handleNutritionChange = (field, value) => {
    // Ensure value is not negative
    const validValue = Math.max(0, Number(value));
    setNutrition(prev => ({
      ...prev,
      [field]: validValue
    }));
  };

  return { 
    nutrition, 
    handleNutritionChange,
    setNutrition // Expose setNutrition for form reset
  };
};
