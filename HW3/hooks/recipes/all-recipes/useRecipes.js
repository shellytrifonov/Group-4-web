/**
 * Custom hook for managing all recipes data.
 * Handles recipe fetching, filtering, and error states.
 * @returns {Object} Recipes data, loading state, and error handling
 */
import { useState, useEffect } from 'react';

export const useRecipes = (selectedCategory) => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/recipes/filtered?category=${selectedCategory}`
        );
        if (!response.ok) {
          throw new Error(`Error fetching recipes: ${response.statusText}`);
        }
        const data = await response.json();
        setRecipes(data.recipes);
        setFilteredRecipes(data.recipes);
        setCategories(data.categories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [selectedCategory]);

  return { recipes, filteredRecipes, setFilteredRecipes, categories, loading, error };
};
