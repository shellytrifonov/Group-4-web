/**
 * Main meal planner table component that displays the weekly meal schedule.
 * Features responsive design with different layouts for desktop and mobile views.
 * Allows adding and removing recipes for each meal slot.
 * Integrates with RecipeCard components to display meal information.
 */

import React from 'react';
import RecipeCard from './RecipeCard';

export const MealPlannerTable = ({ 
  days, 
  meals, 
  mealPlan, 
  onRemoveRecipe, 
  onOpenModal 
}) => {
  return (
    <div className="w-full">
      {/* Desktop view */}
      <div className="hidden md:block overflow-x-auto">
        <div className="shadow-lg rounded-lg overflow-hidden bg-white">
          <table className="table-auto border-collapse border border-gray-300 mx-auto w-full max-w-8xl">
            <thead>
              <tr>
                <th className="top-0 bg-gray-50 border px-4 py-2">Day</th>
                {meals.map((meal) => (
                  <th key={meal} className="top-0 bg-gray-50 border px-4 py-2">
                    {meal}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day}>
                  <td className="border px-4 py-2 font-bold">{day}</td>
                  {meals.map((meal) => (
                    <td key={meal} className="border px-4 py-2">
                      <div className="space-y-2">
                        {mealPlan[day][meal].map((recipe, idx) => (
                          <RecipeCard
                            key={idx}
                            recipe={recipe}
                            onRemove={() => onRemoveRecipe(day, meal, recipe._id)}
                          />
                        ))}
                        <button
                          className="add-btn text-blue-500 hover:underline"
                          onClick={() => onOpenModal(day, meal)}
                        >
                          + Add Recipe
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden space-y-4">
        {days.map((day) => (
          <div key={day} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 font-bold border-b">{day}</div>
            <div className="divide-y divide-gray-200">
              {meals.map((meal) => (
                <div key={meal} className="p-4">
                  <div className="font-medium text-gray-700 mb-2">{meal}</div>
                  <div className="space-y-2">
                    {mealPlan[day][meal].map((recipe, idx) => (
                      <RecipeCard
                        key={idx}
                        recipe={recipe}
                        onRemove={() => onRemoveRecipe(day, meal, recipe._id)}
                      />
                    ))}
                    <button
                      className="add-btn text-blue-500 hover:underline"
                      onClick={() => onOpenModal(day, meal)}
                    >
                      + Add Recipe
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlannerTable;