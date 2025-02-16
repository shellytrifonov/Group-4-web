/**
 * Grid component for displaying recipes within a specific category.
 * Renders a responsive grid of RecipeCard components.
 * Handles empty states with appropriate messaging.
 * Adapts layout from 1 to 5 columns based on screen size.
 */

import RecipeCard from "../../meal-planner/RecipeCard";

export const CategoryRecipeGrid = ({ recipes }) => {  
  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center py-8">
        <p>No recipes found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          recipe={recipe}
          onRemove={null}  
        />
      ))}
    </div>
  );
};