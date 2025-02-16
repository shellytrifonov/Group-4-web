/**
 * RecipeList component - Displays the grid of recipe items in the modal.
 * Handles the layout and rendering of recipe items.
 */
import RecipeListItem from './RecipeListItem';

const RecipeList = ({ recipes, selectedRecipes, onRecipeSelect }) => {
  return (
    <div className="modal-body p-4 max-h-96 overflow-y-auto">
      {recipes.length > 0 ? (
        <ul className="grid grid-cols-2 gap-4">
          {recipes.map((recipe) => (
            <RecipeListItem
              key={recipe._id}
              recipe={recipe}
              isSelected={selectedRecipes.some((r) => r._id === recipe._id)}
              onSelect={onRecipeSelect}
            />
          ))}
        </ul>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No recipes found</p>
        </div>
      )}
    </div>
  );
};

export default RecipeList;
