/**
 * A dynamic form component for managing recipe ingredients.
 * Allows users to add, remove, and edit ingredients with their quantities and units.
 * Features input validation and proper number formatting for ingredient amounts.
 * Each ingredient entry includes fields for name, amount, and measurement unit.
 */

export const IngredientsList = ({ ingredients, handleIngredientChange, removeIngredient, addIngredient, fixNumber }) => {
    return (
      <div className="mb-4 flex flex-col">
        <label className="block text-sm font-medium mb-2 text-gray-900">
          Ingredients
        </label>
        <div id="ingredientsContainer" className="space-y-2">
          {ingredients.map((ingredient, index) => (
            <div className="ingredient-row flex space-x-4 items-center relative" key={index}>
              <input
                type="text"
                className="bg-gray-50 w-2/4 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Ingredient"
                value={ingredient.ingredientName}
                onChange={(e) =>
                  handleIngredientChange(index, "ingredientName", e.target.value)
                }
                required
              />
              <input
                type="number"
                className="bg-gray-50 border w-1/4 border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Amount"
                value={fixNumber(ingredient.amount)}
                onChange={(e) =>
                  handleIngredientChange(index, "amount", e.target.value)
                }
                min="0"
                required
              />
              <select
                className="bg-gray-50 w-1/4 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                value={ingredient.unit}
                onChange={(e) =>
                  handleIngredientChange(index, "unit", e.target.value)
                }
              >
                <option value="">Unit</option>
                <option value="grams">Grams</option>
                <option value="ml">ml</option>
                <option value="cups">Cups</option>
                <option value="tablespoon">Tablespoon</option>
                <option value="piece">Piece</option>
              </select>
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="remove-instruction absolute -right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 text-3xl"
                aria-label="Remove"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addIngredient}
          className="flex items-center space-x-1 cursor-pointer font-bold mt-2"
          style={{ color: "#ff914d" }}
        >
          + Add Ingredient
        </button>
      </div>
    );
  };