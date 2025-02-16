/**
 * Header component for individual recipe pages.
 * Displays recipe title and action buttons (Save/Unsave and Order).
 * Handles loading states for save functionality.
 * Features responsive layout for different screen sizes.
 */

export const RecipeHeader = ({ recipe, isSaved, saveLoading, onSave, onOrder }) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-6 mb-6">
      <h1 className="text-2xl md:text-4xl font-bold">
        {recipe.recipeName}
      </h1>
      <div className="flex gap-2 md:gap-4">
        <button
          className={`btn flex-1 md:flex-none ${saveLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={onSave}
          disabled={saveLoading}
        >
          {isSaved ? 'Unsave' : 'Save'}
        </button>
        <button
          className="btn flex-1 md:flex-none"
          onClick={onOrder}
        >
          Order
        </button>
      </div>
    </div>
  );
};