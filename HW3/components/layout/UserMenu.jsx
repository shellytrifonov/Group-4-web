/**
 * User menu component displaying user profile information and options.
 * Shows user avatar and name with a dropdown menu for profile actions.
 * Handles user logout functionality and navigation to profile page.
 * Appears in the header when a user is logged in.
 */

import Link from "next/link";
import { useRouter } from "next/router";

const UserMenu = ({ userName, userPic }) => {
  const router = useRouter();

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from storage
    window.dispatchEvent(new Event("userLoggedOut")); // Notify header to update
    router.push("/auth/login"); // Redirect to login page
  };
  
  return (
    <div className="relative group">
      {/* User Profile*/}
      <Link href="/profile" legacyBehavior>
        <a className="flex items-center cursor-pointer text-gray-800 dark:text-gray-200">
          <img
            src={userPic}
            alt="User Profile"
            className="w-8 h-8 rounded-full mr-2 border border-gray-300 dark:border-gray-600"
          />
          <span className="text-base lg:text-lg whitespace-nowrap">Hello, {userName}</span>
        </a>
      </Link>

      {/* Dropdown Menu*/}
      <div className="dropdown-menu absolute left-0 -mt-1 w-44 bg-white dark:bg-gray-900 shadow-lg rounded-md p-2 hidden group-hover:block transition-transform transform scale-95">
        <ul className="space-y-2">
          <li>
            <Link href="/profile" legacyBehavior>
              <a className="dropdown-link block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                Profile
              </a>
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="dropdown-link block px-4 py-2 w-full text-left text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;