/**
 * Custom hook for managing recipe search functionality
 * Handles search query state and filtering recipes
 */
import { useState, useMemo } from 'react';

export const useRecipeSearch = (recipes) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecipes = useMemo(() => 
    recipes.filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [recipes, searchQuery]
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return {
    searchQuery,
    handleSearchChange,
    filteredRecipes,
  };
};
