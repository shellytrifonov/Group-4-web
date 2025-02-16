/**
 * Custom hook for managing recipe form submission and alerts
 * Handles form submission, validation, and alert states
 */
import { useState } from 'react';
import { toBase64 } from '../../lib/fileUtils';

export const useRecipeSubmission = (user) => {
  const [alert, setAlert] = useState(null);

  // Map recipe categories to main categories
  const categoryToMainCategory = {
    'Main-Dish': 'Main-Dish',
    'Appetizers': 'Appetizer',
    'Salads': 'Salad',
    'Side-Dishes': 'Side-Dish',
    'Soup': 'Soup',
    'Vegetarian': 'Vegetarian'
  };

  const submitRecipe = async (recipeData) => {
    try {
      // Convert image to Base64
      const base64Image = recipeData.recipeImage ? await toBase64(recipeData.recipeImage) : "";

      // Prepare recipe data object for submission
      const finalRecipeData = {
        ...recipeData,
        recipeImage: base64Image,
        mainCategory: categoryToMainCategory[recipeData.recipeCategory],
        creator: user.email
      };

      // Send data to the API
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalRecipeData),
      });
    
      const data = await response.json();
      
      // Handle API response
      if (response.ok) {
        setAlert({
          message: 'Recipe Added Successfully!',
          type: 'success'
        });
        return true;
      } else {
        setAlert({
          message: data.error || data.message || "Failed to add recipe",
          type: 'error'
        });
        return false;
      }
    } catch (error) {
      console.error("Full error:", error);
      setAlert({
        message: "Error saving recipe",
        type: 'error'
      });
      return false;
    }
  };

  return {
    alert,
    setAlert,
    submitRecipe,
  };
};
