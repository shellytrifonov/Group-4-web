/**
 * Grid component for displaying all recipes.
 * Renders a responsive grid of RecipeCard components.
 * Handles empty states and admin-specific delete functionality.
 * Adapts layout from 1 to 4 columns based on screen size.
 */

import { memo, useMemo } from "react";
import RecipeCard from "../../meal-planner/RecipeCard";

const MemoizedRecipeCard = memo(RecipeCard);

export const AllRecipesGrid = ({ filteredRecipes, handleRemoveRecipe, isAdmin }) => {
  const memoizedRecipes = useMemo(() => filteredRecipes, [filteredRecipes]);

  if (!memoizedRecipes || memoizedRecipes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No recipes found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
      {memoizedRecipes.map((recipe) => (
        <MemoizedRecipeCard
          key={recipe._id}
          recipe={recipe}
          onRemove={isAdmin ? () => handleRemoveRecipe(recipe._id) : null}
        />
      ))}
    </div>
  );
};