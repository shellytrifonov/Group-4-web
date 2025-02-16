/**
 * Custom hook for tracking the application's dark mode state.
 * Uses MutationObserver to watch for changes in the root element's class list.
 * Automatically updates when theme changes are detected.
 * @returns {boolean} Current dark mode state
 */
import { useState, useEffect } from "react";

const useLogoState = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled on first render
    setIsDarkMode(document.documentElement.classList.contains("dark"));

    // Listen for changes in dark mode
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return isDarkMode;
};

export default useLogoState;