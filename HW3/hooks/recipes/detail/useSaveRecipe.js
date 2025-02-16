/**
 * Custom hook for recipe saving functionality.
 * Manages save/unsave operations and loading states.
 * @returns {Object} Save state and toggle functions
 */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const useSaveRecipe = (id) => {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (id) {
      const user = localStorage.getItem('user') ? 
        JSON.parse(localStorage.getItem('user')) : null;
        
      if (user) {
        const checkSaveStatus = async () => {
          try {
            const response = await fetch(`/api/recipes/save-status/${id}`, {
              headers: {
                'user-email': user.email
              }
            });
            if (response.ok) {
              const data = await response.json();
              setIsSaved(data.isSaved);
            }
          } catch (err) {
            console.error("Error checking save status:", err);
          }
        };
        checkSaveStatus();
      }
    }
  }, [id]);

  const handleSaveToggle = async () => {
    const user = localStorage.getItem('user') ? 
      JSON.parse(localStorage.getItem('user')) : null;
   
    if (!user) {
      router.push('/auth/signin');
      return;
    }
   
    try {
      setSaveLoading(true);
      const response = await fetch('/api/recipes/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipeId: id,
          action: isSaved ? 'unsave' : 'save',
          email: user.email
        })
      });
   
      if (response.ok) {
        setIsSaved(!isSaved);
        // Show alert when saved/unsaved
        setAlert({
          message: isSaved ? "Recipe removed from saved list!" : "Recipe saved successfully!",
          type: "success",
        });
      } else {
        setAlert({
          message: "Failed to save the recipe. Please try again.",
          type: "error",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaveLoading(false);
    }
  };

  return { isSaved, saveLoading, handleSaveToggle, alert, setAlert };
};
