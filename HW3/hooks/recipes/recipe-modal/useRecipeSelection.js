/**
 * Custom hook for managing recipe selection state and actions
 * Handles selecting, deselecting, and submitting selected recipes
 */
import { useState } from 'react';

export const useRecipeSelection = (onAddRecipes, onClose) => {
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  const toggleRecipeSelection = (recipe) => {
    setSelectedRecipes((prevSelected) => {
      const isSelected = prevSelected.some((r) => r._id === recipe._id);
      return isSelected
        ? prevSelected.filter((r) => r._id !== recipe._id)
        : [...prevSelected, recipe];
    });
  };

  const handleAddSelectedRecipes = () => {
    if (selectedRecipes.length > 0) {
      onAddRecipes(selectedRecipes);
    }
    setSelectedRecipes([]);
    onClose();
  };

  return {
    selectedRecipes,
    toggleRecipeSelection,
    handleAddSelectedRecipes,
  };
};
