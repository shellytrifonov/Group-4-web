/**
 * Custom hook for managing recipe form submission and validation
 * Handles form submission, validation, and error handling
 */
import { useState } from 'react';

export const useRecipeForm = (user, submitRecipe) => {
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (event, formData) => {
    event.preventDefault();

    // Validate required fields
    if (!user || !formData.isBasicInfoComplete()) {
      setAlert({
        message: "Please fill all required fields",
        type: 'error'
      });
      return;
    }

    try {
      const success = await submitRecipe({
        recipeName: formData.recipeName,
        recipeCategory: formData.recipeCategory,
        makingTime: formData.makingTime,
        nutrition: formData.nutrition,
        ingredients: formData.ingredients,
        instructions: formData.instructions,
        recipeImage: formData.recipeImage
      });

      if (success) {
        // Reset form fields
        formData.setRecipeName('');
        formData.setRecipeCategory('');
        formData.setRecipeImage(null);
        formData.setIngredients([{ ingredientName: "", amount: 0, unit: "Unit" }]);
        formData.setInstructions(['']);
        formData.updateHours(0);
        formData.updateMinutes(0);
        formData.setNutrition({
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0
        });
        setAlert({
          message: "Recipe submitted successfully",
          type: 'success'
        });
      }
    } catch (error) {
      setAlert({
        message: error.message || "Failed to submit recipe",
        type: 'error'
      });
    }
  };

  return {
    alert,
    setAlert,
    handleSubmit,
  };
};
