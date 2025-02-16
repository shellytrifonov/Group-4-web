/**
 * Custom hook for managing basic recipe information state
 * Handles recipe name, category, and image
 */
import { useState } from 'react';

export const useRecipeBasicInfo = () => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeCategory, setRecipeCategory] = useState("");
  const [recipeImage, setRecipeImage] = useState(null);

  const isBasicInfoComplete = () => {
    return recipeName && recipeCategory && recipeImage;
  };

  return {
    recipeName,
    setRecipeName,
    recipeCategory,
    setRecipeCategory,
    recipeImage,
    setRecipeImage,
    isBasicInfoComplete,
  };
};
