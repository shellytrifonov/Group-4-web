/**
 * Component for displaying individual shopping list items.
 * Features delete and print functionality for list management.
 * Displays recipe name, creation date, and ingredient details.
 * Supports both light and dark theme modes.
 * Includes responsive styling and clear visual hierarchy.
 */

import { PrinterIcon } from "@heroicons/react/24/outline";

export const ShoppingListItem = ({ list, onDelete, onPrint, formatDate }) => {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white rounded-lg shadow-md p-6 relative">
      {/* Delete & Print Buttons */}
      <div className="absolute right-2 top-2 flex space-x-2">
        <button
          onClick={() => onDelete(list._id)}
          className="text-red-500 dark:text-red-400 text-3xl cursor-pointer"
          aria-label="Delete"
        >
          &times;
        </button>

        {/* Print Button*/}
        <button onClick={() => onPrint(list)} className="text-gray-600 dark:text-gray-300">
          <PrinterIcon className="h-6 w-6 dark:text-white" />
        </button>
      </div>

      {/* Title & Date */}
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded">
          {list.recipeName}
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400 ml-4">
          {formatDate(list.createdAt)}
        </span>
      </div>

      {/* Ingredients List */}
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {list.items &&
          list.items.map((item, index) => (
            <li key={index} className="py-3 flex justify-between items-center">
              <span className="text-gray-800 dark:text-gray-200">{item.ingredientName}</span>
              <span className="text-gray-600 dark:text-gray-400">
                {item.amount} {item.unit}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};