/**
 * RecipeListItem component - Displays a single recipe item in the modal list.
 * Handles selection state and displays recipe information.
 */
const RecipeListItem = ({ recipe, isSelected, onSelect }) => {
  return (
    <li
      className={`border rounded-lg p-2 cursor-pointer ${
        isSelected ? "border-blue-500 bg-blue-100 dark:bg-blue-900" : "dark:border-gray-700"
      }`}
      onClick={() => onSelect(recipe)}
    >
      <img
        src={recipe.recipeImage}
        alt={recipe.recipeName}
        className="w-full h-32 object-cover rounded"
      />
      <div className="mt-2 text-center">
        <h3 className="font-bold text-sm dark:text-white">{recipe.recipeName}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {recipe.ingredients.length} ingredients •{" "}
          {recipe.makingTime.hours > 0
            ? `${recipe.makingTime.hours} hr ${recipe.makingTime.minutes} min`
            : `${recipe.makingTime.minutes} min`}
        </p>
        {isSelected && (
          <p className="text-blue-500 dark:text-blue-400 text-sm mt-1">Selected</p>
        )}
      </div>
    </li>
  );
};

export default RecipeListItem;
