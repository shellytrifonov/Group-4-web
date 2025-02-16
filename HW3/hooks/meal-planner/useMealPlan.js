/**
 * Custom hook for managing weekly meal planning functionality.
 * Handles meal slots, recipes, user auth, and shopping list generation.
 * @returns {Object} Meal plan state and management functions
 */

import { useState, useEffect } from 'react';

const useMealPlan = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const meals = ["Breakfast", "Lunch", "Dinner"];

  const [mealPlan, setMealPlan] = useState(
    days.reduce((acc, day) => {
      acc[day] = { Breakfast: [], Lunch: [], Dinner: [] };
      return acc;
    }, {})
  );

  const [recipes, setRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (!userInfo) {
      alert("You need to log in to access the meal planner.");
      return;
    }

    const parsedUser = JSON.parse(userInfo);
    setUser(parsedUser);

    const fetchMealPlan = async () => {
      try {
        const response = await fetch(`/api/meal-planner/meal-planner?userId=${parsedUser._id}`);
        const data = await response.json();
        if (response.ok && data.mealPlan) {
          setMealPlan(data.mealPlan);
        } else {
          console.warn("No meal plan found for the user.");
        }
      } catch (error) {
        console.error("Error fetching meal plan:", error);
      }
    };

    fetchMealPlan();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/api/meal-planner/all-recipes");
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const openModal = (day, meal) => {
    setSelectedDay(day);
    setSelectedMeal(meal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDay(null);
    setSelectedMeal(null);
  };

  const addRecipesToMeal = (selectedRecipes) => {
    if (selectedDay && selectedMeal) {
      const updatedMealPlan = {
        ...mealPlan,
        [selectedDay]: {
          ...mealPlan[selectedDay],
          [selectedMeal]: [...mealPlan[selectedDay][selectedMeal], ...selectedRecipes],
        },
      };

      setMealPlan(updatedMealPlan);
    }
    closeModal();
  };

  const saveMealPlan = async () => {
    if (!user) {
      alert("You need to log in to save your meal plan.");
      return;
    }

    const mealPlanData = {
      userId: user._id,
      mealPlan,
    };

    try {
      const response = await fetch("/api/meal-planner/meal-planner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mealPlanData),
      });

      if (response.ok) {
        setAlert({
          message: 'Meal plan saved successfully!',
          type: 'success'
        });
      } else {
        setAlert({
          message: "Failed to save meal plan.",
          type: 'error'
        });
      }
    } catch (error) {
      console.error(error);
      setAlert({
        message: "An error occurred while saving your meal plan.",
        type: 'error'
      });
    }
  };

  const deleteMealPlan = async () => {
    if (!user) {
      alert("You need to log in to delete your meal plan.");
      return;
    }

    const confirmDiv = document.createElement('div');
    confirmDiv.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    confirmDiv.innerHTML = `
     <div class="bg-white rounded-lg p-6 max-w-sm w-full mx-4 transform -translate-y-1/4">
       <p class="text-gray-600 mb-6 text-center">Are you sure you want to delete your meal plan?</p>
       <div class="flex justify-center gap-4">
         <button class="btn btn-secondary" id="cancelDelete">Cancel</button>
         <button class="btn" id="confirmDelete">Delete</button>
       </div>
     </div>
    `;
    
    document.body.appendChild(confirmDiv);
    
    const confirmed = await new Promise((resolve) => {
      document.getElementById('cancelDelete').onclick = () => {
        document.body.removeChild(confirmDiv);
        resolve(false);
      };
      
      document.getElementById('confirmDelete').onclick = () => {
        document.body.removeChild(confirmDiv);
        resolve(true);
      };
    });

    if (!confirmed) return;

    try {
      const response = await fetch("/api/meal-planner/meal-planner", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id }),
      });

      if (response.ok) {
        setAlert({
          message: 'Meal plan deleted successfully!',
          type: 'success'
        });
        
        const resetMealPlan = days.reduce((acc, day) => {
          acc[day] = { Breakfast: [], Lunch: [], Dinner: [] };
          return acc;
        }, {});
        setMealPlan(resetMealPlan);
      } else {
        const errorData = await response.json();
        setAlert({
          message: errorData.error || "Failed to delete meal plan.",
          type: 'error'
        });
      }
    } catch (error) {
      console.error("Error deleting meal plan:", error);
      setAlert({
        message: "An error occurred while deleting your meal plan.",
        type: 'error'
      });
    }
  };

  const handleRemoveRecipe = (day, meal, recipeId) => {
    setMealPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [meal]: prev[day][meal].filter((recipe) => recipe._id !== recipeId),
      },
    }));
  };

  return {
    days,
    meals,
    mealPlan,
    recipes,
    isModalOpen,
    selectedDay,
    selectedMeal,
    alert,
    setAlert,
    openModal,
    closeModal,
    addRecipesToMeal,
    saveMealPlan,
    deleteMealPlan,
    handleRemoveRecipe,
  };
};

export default useMealPlan;