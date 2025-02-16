/**
 * Custom hook for detailed recipe information.
 * Fetches and manages individual recipe details.
 * @returns {Object} Recipe details, loading state, and error handling
 */
import { useState, useEffect } from 'react';

export const useRecipesDetail = (id) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/recipes/detail/${id}`);
          if (!response.ok) {
            throw new Error(`Error fetching recipe: ${response.statusText}`);
          }
          const data = await response.json();
          setRecipe(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchRecipe();
    }
  }, [id]);

  return { recipe, loading, error };
};