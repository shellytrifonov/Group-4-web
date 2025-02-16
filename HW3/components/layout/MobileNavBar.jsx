/**
 * Mobile navigation bar component with slide-out menu functionality.
 * Provides mobile-optimized navigation links with icons.
 * Includes user authentication options and theme toggle.
 * Appears as a full-screen overlay when activated.
 */

import Link from "next/link";
import { useRouter } from "next/router";
import { 
  HomeIcon, 
  BookOpenIcon, 
  CalendarIcon, 
  ShoppingCartIcon, 
  BookmarkIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

const MobileNavBar = ({ isOpen, setIsOpen }) => {
  const router = useRouter();

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userLoggedOut"));
    router.push("/auth/login");
  };

  return (
    <div className={`fixed inset-0 z-50 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } lg:hidden flex flex-col`}>
      <nav className="flex flex-col items-start p-6 space-y-6 text-lg font-medium w-full">
        {/* Logo + Close Button */}
        <div className="w-full flex justify-between items-center">
          <h2 className="text-2xl font-bold dark:text-white">Plan & Plate</h2>
          <button 
            className="text-gray-600 dark:text-gray-300 text-2xl" 
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="w-full flex flex-col space-y-4">
          <li>
            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400">
              <HomeIcon className="w-6 h-6" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link href="/recipes/all-recipes" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400">
              <BookOpenIcon className="w-6 h-6" />
              <span>Recipes</span>
            </Link>
          </li>
          <li>
            <Link href="/recipes/recipes-creator" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400">
              <PencilSquareIcon className="w-6 h-6" />
              <span>Add New Recipe</span>
            </Link>
          </li>
          <li>
            <Link href="/meal-planner" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400">
              <CalendarIcon className="w-6 h-6" />
              <span>Meal Planner</span>
            </Link>
          </li>
          <li>
            <Link href="/shopping-list" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400">
              <ShoppingCartIcon className="w-6 h-6" />
              <span>Shopping List</span>
            </Link>
          </li>
          <li>
            <Link href="/saved" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400">
              <BookmarkIcon className="w-6 h-6" />
              <span>Saved</span>
            </Link>
          </li>
        </ul>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full text-center text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 mt-auto"
        >
          Log Out
        </button>
      </nav>
    </div>
  );
};

export default MobileNavBar;