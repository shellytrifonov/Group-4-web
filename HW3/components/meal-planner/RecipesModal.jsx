/**
 * RecipesModal component - Main modal container for recipe selection.
 * Uses custom hooks for search and selection functionality.
 */
import React from "react";
import ModalHeader from "./modal/ModalHeader";
import RecipeList from "./modal/RecipeList";
import { useRecipeSelection } from "../../hooks/recipes/recipe-modal/useRecipeSelection";
import { useRecipeSearch } from "../../hooks/recipes/recipe-modal/useRecipeSearch";

const RecipesModal = ({ isOpen, onClose, title, recipes, onAddRecipes }) => {
  const { searchQuery, handleSearchChange, filteredRecipes } = useRecipeSearch(recipes);
  const { selectedRecipes, toggleRecipeSelection, handleAddSelectedRecipes } = useRecipeSelection(onAddRecipes, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-2xl dark:shadow-gray-800 max-w-4xl w-full p-6 z-50 border dark:border-gray-700">
        <ModalHeader
          onClose={onClose}
          title={title}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

        <RecipeList
          recipes={filteredRecipes}
          selectedRecipes={selectedRecipes}
          onRecipeSelect={toggleRecipeSelection}
        />

        {/* Modal Footer */}
        <div className="modal-footer flex justify-end p-4 border-t dark:border-gray-700">
          <button
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-300 dark:hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleAddSelectedRecipes}
            disabled={selectedRecipes.length === 0}
          >
            Add Selected ({selectedRecipes.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipesModal;
