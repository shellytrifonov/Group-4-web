/**
 * A component for capturing basic recipe information.
 * Handles core recipe details including name, category, and image upload.
 * Provides a dropdown for selecting predefined recipe categories.
 * Includes image upload functionality with preview capabilities.
 */

export const RecipeBasicInfo = ({ recipeName, setRecipeName, recipeCategory, setRecipeCategory, recipeImage, setRecipeImage }) => {
    return (
      <>
        <div className="mb-4 flex flex-col">
          <label className="block text-sm font-medium mb-2 text-gray-900">
            Recipe Name
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Enter recipe name"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            required
          />
        </div>
  
        <div className="mb-4 flex flex-col">
          <label className="block text-sm font-medium mb-2 text-gray-900">
            Recipe Category
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            value={recipeCategory}
            onChange={(e) => setRecipeCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="Main-Dish">Main Dish</option>
            <option value="appetizers">Appetizers</option>
            <option value="Salad">Salads</option>
            <option value="Side-Dishes">Side Dishes</option>
            <option value="Soup">Soup</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>
  
        <div className="mb-4 flex flex-col">
          <label className="block text-sm font-medium mb-2 text-gray-900">
            Recipe Image
          </label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            onChange={(e) => setRecipeImage(e.target.files[0])}
            required
          />
          <p className="text-sm text-gray-500 mt-1">Supported formats: JPG, PNG.</p>
        </div>
      </>
    );
  };