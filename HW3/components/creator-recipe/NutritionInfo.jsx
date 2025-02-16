/**
 * A component for entering recipe nutritional information.
 * Provides input fields for calories, protein, carbs, and fat content.
 * Features number validation and proper formatting for nutritional values.
 * Displays measurements in grams for consistent unit representation.
 */
export const NutritionInfo = ({ nutrition, handleNutritionChange, fixNumber }) => {
    return (
      <div className="mb-4 flex flex-col items-center">
        <label className="block text-sm font-medium mb-2 text-gray-900">
          Nutrition
        </label>
        <div className="flex flex-col gap-2 w-full">
          {["calories", "protein", "carbs", "fat"].map((field) => (
            <div className="flex justify-between items-center" key={field}>
              <span className="text-sm font-medium w-1/4 capitalize">
                {field}:
              </span>
              <input
                type="number"
                min="0"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                value={fixNumber(nutrition[field])}
                onChange={(e) =>
                  handleNutritionChange(field, e.target.value)
                }
              />
              <span className="text-sm font-medium pl-2">grams</span>
            </div>
          ))}
        </div>
      </div>
    );
  };