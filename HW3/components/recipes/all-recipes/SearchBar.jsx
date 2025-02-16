/**
 * SearchBar component - Displays a styled search input with an icon.
 * Allows users to input text and triggers a callback on value changes.
 */
import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBar = ({ placeholder = "Search...", value, onChange }) => {
  return (
    <div className="relative w-full max-w-sm flex">
      {/* Search Icon*/}
      <div className="flex items-center px-3 bg-white dark:bg-black border border-gray-300 dark:border-white rounded-l">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 dark:text-white" />
      </div>

      {/* Input Field*/}
      <input
        type="text"
        placeholder={placeholder}
        className="block w-full p-2 border border-l-0 border-gray-300 dark:border-white rounded-r
                   bg-white dark:bg-black text-gray-900 dark:text-white 
                   focus:ring-blue-500 dark:focus:ring-blue-400 
                   focus:border-blue-500 dark:focus:border-white"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;