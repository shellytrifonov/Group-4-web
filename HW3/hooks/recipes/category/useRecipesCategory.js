/**
 * Custom hook for category-specific recipe management.
 * Fetches and manages recipes for a specific category.
 * @returns {Object} Category recipes, loading state, and error handling
 */
import { useState, useEffect, useRef } from "react";

export const useRecipesCategory = (category) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const cache = useRef({}); // Store previously fetched categories

  useEffect(() => {
    if (!category) return;

    if (cache.current[category]) {
      // Use cached data if available
      setRecipes(cache.current[category]);
      setLoading(false);
      return;
    }

    const controller = new AbortController(); // Abort previous request
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          category === "all" ? `/api/recipes/all` : `/api/recipes/${category}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Error fetching recipes: ${response.statusText}`);
        }

        const data = await response.json();
        cache.current[category] = data; // Store data in cache
        setRecipes(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          console.error("Error fetching recipes:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
    return () => controller.abort(); // Cleanup function to cancel previous request
  }, [category]);

  return { recipes, loading, error };
};