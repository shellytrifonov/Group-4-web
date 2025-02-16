/**
 * Sidebar component for recipe category filtering.
 * Displays a list of all available recipe categories.
 * Highlights currently selected category.
 * Supports both light and dark theme modes.
 * Includes an "All Categories" option for unfiltered view.
 */

import { memo, useCallback } from "react";

export const CategorySidebar = memo(({ categories, selectedCategory, setSelectedCategory }) => {
  const handleCategoryClick = useCallback(
    (category) => () => setSelectedCategory(category),
    [setSelectedCategory]
  );

  return (
    <div className="w-64 pr-8 recipe-box">
      <div className="bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="space-y-2">
          <button
            onClick={handleCategoryClick("all")}
            className={`w-full text-left px-3 py-2 rounded transition duration-300 ${
              selectedCategory === "all"
                ? "bg-gray-500 text-white dark:bg-gray-500 dark:text-white font-bold"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={handleCategoryClick(category)}
              className={`w-full text-left px-3 py-2 rounded transition duration-300 ${
                selectedCategory === category
                  ? "bg-gray-500 text-white dark:bg-gray-500 dark:text-white font-bold"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});