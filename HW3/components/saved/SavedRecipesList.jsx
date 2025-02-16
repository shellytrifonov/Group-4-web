/**
 * Component for displaying the grid of saved recipes.
 * Renders a responsive grid of RecipeCard components.
 * Supports recipe deletion functionality.
 * Adapts layout based on screen size (1-3 columns).
 */

import RecipeCard from "../meal-planner/RecipeCard";

export const SavedRecipesList = ({ recipes, onDelete }) => {
  return (
    <main className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Saved Recipes
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onRemove={onDelete}
          />
        ))}
      </div>
    </main>
  );
};