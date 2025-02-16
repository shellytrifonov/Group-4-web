/**
 * Custom hook for managing user profile data and recipes.
 * Handles user authentication, recipe management, and loading states.
 * @returns {Object} User profile data and recipe management functions
 */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export const useProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recipesLoading, setRecipesLoading] = useState(true);
  const [userRecipes, setUserRecipes] = useState([]);

  const handleDeleteRecipe = async (recipeId) => {
    try {
      const response = await fetch(
        `/api/recipes/delete?recipeId=${recipeId}&userEmail=${user.email}`,
        {
          method: "DELETE",
        }
      );
  
      if (response.ok) {
        setUserRecipes((prev) => prev.filter((recipe) => recipe._id !== recipeId));
      } else {
        console.error("Failed to delete recipe:", await response.text());
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    if (!userInfo) {
      router.push('/auth/login');
      return;
    }
    setUser(JSON.parse(userInfo));
    setLoading(false);

    const fetchUserRecipes = async () => {
      try {
        const response = await fetch(`/api/recipes/user-recipes?email=${JSON.parse(userInfo).email}`);
        if (response.ok) {
          const data = await response.json();
          setRecipesLoading(false);
          setUserRecipes(data);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchUserRecipes();
  }, []);

  return {
    user,
    loading,
    recipesLoading,
    userRecipes,
    handleDeleteRecipe
  };
};