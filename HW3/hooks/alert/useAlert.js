/**
 * Custom hook for managing alert visibility with auto-dismiss functionality.
 * @param {number} duration - Duration in milliseconds before the alert is dismissed (default: 2300ms)
 * @param {Function} onClose - Optional callback function to be called when alert is dismissed
 * @returns {Object} Object containing isVisible state and setIsVisible function
 */
import { useState, useEffect } from "react";

export const useAlert = (duration = 2300, onClose) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.(); // Call the close function if provided
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return { isVisible, setIsVisible };
};