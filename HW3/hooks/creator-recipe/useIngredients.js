/**
 * Custom hook for managing recipe ingredients.
 * Handles adding, removing, and updating ingredient entries.
 * Enforces minimum of one ingredient and prevents negative amounts.
 * @returns {Object} Object containing ingredients array and handler functions
 */
import { useState } from 'react';

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState([
    { ingredientName: "", amount: 0, unit: "Unit" },
  ]);

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { ingredientName: "", amount: 0, unit: "Unit" },
    ]);
  };

  const removeIngredient = (index) => {
    if (index === 0 && ingredients.length === 1) {
      alert("Recipe must have at least one ingredient");
      return;
    }
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index, field, value) => {
    if (field === "amount" && value < 0) {
      value = 0;
    }

    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  return { 
    ingredients, 
    addIngredient, 
    removeIngredient, 
    handleIngredientChange,
    setIngredients // Expose setIngredients for form reset
  };
};
