/**
 * NavBar component - Renders the main navigation menu for the application.
 * Includes links to key pages such as Recipes, Meal Planner, Shopping List, and Saved Recipes.
 */
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();

  // Function to check if a link is active
  const isActive = (path) => router.pathname === path;

  return (
    <nav className="flex-grow relative">
      <ul className="flex items-center space-x-4 lg:space-x-8 text-base lg:text-lg font-medium whitespace-nowrap">
        <li className="text-center">
          <Link href="/" legacyBehavior>
            <a className={`nav-link relative inline-block text-center ${isActive("/") ? "text-[#ff914d] font-semibold after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[#ff914d]" : "hover:text-[#ff914d]"}`}>
              Home
            </a>
          </Link>
        </li>

        {/* Recipes Dropdown */}
        <li className="relative group text-center">
          <Link href="/recipes/all-recipes" legacyBehavior>
            <a className={`nav-link relative inline-block text-center ${isActive("/recipes/all-recipes") ? "text-[#ff914d] font-semibold after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[#ff914d]" : "hover:text-[#ff914d]"}`}>
              Recipes <span className="dropdown-indicator"></span>
            </a>
          </Link>
          <div style={{ zIndex: 9999 }} className="dropdown-menu absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 shadow-lg rounded-md p-2 hidden group-hover:block">
            <ul className="text-center">
              <li>
                <Link href="/recipes/all-recipes" legacyBehavior>
                  <a className="dropdown-link block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">All Recipes</a>
                </Link>
              </li>
              <li>
                <Link href="/recipes/Salad" legacyBehavior>
                  <a className="dropdown-link block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Salads</a>
                </Link>
              </li>
              <li>
                <Link href="/recipes/Main-Dish" legacyBehavior>
                  <a className="dropdown-link block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Main Dish</a>
                </Link>
              </li>
              <li>
                <Link href="/recipes/Soup" legacyBehavior>
                  <a className="dropdown-link block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Soups</a>
                </Link>
              </li>
              <li>
                <Link href="/recipes/recipes-creator" legacyBehavior>
                  <a className="dropdown-link block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded" data-restricted="true">
                    Add New Recipe
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="text-center">
          <Link href="/meal-planner" legacyBehavior>
            <a className={`nav-link relative inline-block text-center ${isActive("/meal-planner") ? "text-[#ff914d] font-semibold after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[#ff914d]" : "hover:text-[#ff914d]"}`}>
              Meal Planner
            </a>
          </Link>
        </li>
        <li className="text-center">
          <Link href="/shopping-list" legacyBehavior>
            <a className={`nav-link relative inline-block text-center ${isActive("/shopping-list") ? "text-[#ff914d] font-semibold after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[#ff914d]" : "hover:text-[#ff914d]"}`}>
              Shopping List
            </a>
          </Link>
        </li>
        <li className="text-center">
          <Link href="/saved" legacyBehavior>
            <a className={`nav-link relative inline-block text-center ${isActive("/saved") ? "text-[#ff914d] font-semibold after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[#ff914d]" : "hover:text-[#ff914d]"}`}>
              Saved
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;