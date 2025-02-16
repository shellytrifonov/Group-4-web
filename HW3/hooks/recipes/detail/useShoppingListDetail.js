/**
 * Custom hook for shopping list creation from recipes.
 * Handles shopping list generation and management.
 * @returns {Object} Shopping list functions and state
 */
import { useState } from 'react';
import { useRouter } from 'next/router';

export const useShoppingListDetail = () => {
  const router = useRouter();
  const [alert, setAlert] = useState(null);

  const handleOrder = async (recipe) => {
    const user = localStorage.getItem('user') ? 
      JSON.parse(localStorage.getItem('user')) : null;
     
    if (!user) {
      router.push('/auth/signin');
      return;
    }
     
    try {
      const response = await fetch('/api/shopping-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.email,
          recipeName: recipe.recipeName,
          items: recipe.ingredients,
          createdAt: new Date()
        })
      });
     
      if (response.ok) {
        setAlert({
          message: 'Added to shopping list!',
          type: 'success'
        });
      } else {
        setAlert({
          message: "Failed to add to shopping list",
          type: 'error'
        });
      }
    } catch (err) {
      console.error(err);
      setAlert({
        message: "Error adding to shopping list",
        type: 'error'
      });
    }
  };

  return { alert, setAlert, handleOrder };
};