/**
 * Theme toggle button component for switching between light and dark modes.
 * Uses emoji icons (sun/moon) to indicate current theme.
 * Integrates with the app's theme management system.
 */

import useThemeState from "@/hooks/theme/useThemeState";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useThemeState();

  return (
    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
      {isDarkMode ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;