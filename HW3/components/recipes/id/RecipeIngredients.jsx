/**
 * Component for displaying recipe ingredients list.
 * Shows ingredients with their amounts and units.
 * Uses bullet points for clear visual organization.
 * Maintains consistent spacing between ingredients.
 */

export const RecipeIngredients = ({ ingredients }) => {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
        <ul className="list-disc pl-6">
          {ingredients.map((ingredient, index) => (
            <li key={index} className="mb-2">
              {ingredient.amount} {ingredient.unit} {ingredient.ingredientName}
            </li>
          ))}
        </ul>
      </div>
    );
  };