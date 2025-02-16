/**
 * Custom hook for managing saved recipes.
 * Fetches and manages user's saved recipes with loading states.
 * Includes remove functionality and error handling.
 * @returns {Object} Saved recipes data and management functions
 */
import { useEffect, useState } from "react";

export const useSavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.email) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/saved?userId=${user.email}`);
        if (response.ok) {
          const data = await response.json();
          setSavedRecipes(data);
        } else {
          console.error("Failed to fetch saved recipes:", await response.text());
        }
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, []);

  const handleDelete = async (recipeId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(`/api/saved?userId=${user.email}&recipeId=${recipeId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSavedRecipes((prev) => prev.filter((recipe) => recipe._id !== recipeId));
      } else {
        console.error("Failed to delete recipe:", await response.text());
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return {
    savedRecipes,
    loading,
    handleDelete
  };
};