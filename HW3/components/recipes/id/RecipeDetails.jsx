/**
 * Component for displaying detailed recipe information.
 * Shows recipe metadata including category, preparation time, and creator.
 * Displays nutritional information in a separate section.
 * Uses a responsive two-column layout on larger screens.
 */
export const RecipeDetails = ({ recipe }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Details</h2>
          <p className="mb-2">Category: {recipe.recipeCategory}</p>
          <p className="mb-2">
            Time: {recipe.makingTime.hours}h {recipe.makingTime.minutes}m
          </p>
          <p className="mb-2">Created by: {recipe.creator}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Nutrition</h2>
          <p className="mb-2">Calories: {recipe.nutrition.calories}</p>
          <p className="mb-2">Protein: {recipe.nutrition.protein}g</p>
          <p className="mb-2">Carbs: {recipe.nutrition.carbs}g</p>
          <p className="mb-2">Fat: {recipe.nutrition.fat}g</p>
        </div>
      </div>
    );
  };