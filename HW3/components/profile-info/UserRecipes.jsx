/**
 * Component for displaying recipes created by the user.
 * Renders a grid of RecipeCard components with delete functionality.
 * Handles loading states and empty recipe list scenarios.
 * Shows appropriate message when user hasn't created any recipes.
 */

import RecipeCard from "../meal-planner/RecipeCard";

export const UserRecipes = ({ recipes, loading, onRemove }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Recipes</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onRemove={onRemove}
          />
        ))}
      </div>
      {(!loading && (recipes.length === 0)) && (
        <p className="text-center text-gray-500">No recipes created yet</p>
      )}
    </div>
  );
};
