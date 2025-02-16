/**
 * MealPlanner - weekly meal planning.
 */
import React from "react";
import { MealPlannerTable } from "../components/meal-planner/MealPlannerTable";
import { ActionButtons } from "../components/meal-planner/ActionButtons";
import RecipesModal from "../components/meal-planner/RecipesModal";
import Alert from "../components/shared/Alert";
import useMealPlan from "../hooks/meal-planner/useMealPlan";

const MealPlanner = () => {
  const {
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
  } = useMealPlan();

  return (
    <div className="mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Weekly Meal Planner</h1>
      
      {/* Display meal planner table with current meal plan */}
      <MealPlannerTable
        days={days}
        meals={meals}
        mealPlan={mealPlan}
        onRemoveRecipe={handleRemoveRecipe}
        onOpenModal={openModal}
      />

      {/* Action buttons to save or delete meal plan */}
      <ActionButtons
        onSave={saveMealPlan}
        onDelete={deleteMealPlan}
      />

      {/* Recipes modal for selecting recipes to add to a meal */}
      {isModalOpen && (
        <RecipesModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={`Add Recipes for ${selectedDay} - ${selectedMeal}`}
          recipes={recipes}
          onAddRecipes={addRecipesToMeal}
        />
      )}

      {/* Alert message for feedback */}
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
    </div>
  );
};

export default MealPlanner;