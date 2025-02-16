/**
 * Custom hook for recipe search functionality.
 * Manages search query state and filters recipes by name.
 * @returns {Object} Search state and filtered recipes
 */
import { useEffect } from 'react';

export const useRecipeSearch = (searchTerm, recipes, setFilteredRecipes) => {
  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = recipes.filter(
      (recipe) =>
        recipe.recipeName &&
        recipe.recipeName.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredRecipes(filtered);
  }, [searchTerm, recipes, setFilteredRecipes]);
};