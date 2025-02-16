/**
 * Custom hook for managing recipe making time
 * Handles hours and minutes
 */
import { useState } from "react";

export const useMakingTime = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const updateHours = (value) => {
    // Handle empty or invalid input
    if (value === '' || isNaN(value)) {
      setHours('');
      return;
    }

    // Convert to number and validate
    const numValue = parseInt(value, 10);
    setHours(Math.max(0, numValue));
  };

  const updateMinutes = (value) => {
    // Handle empty or invalid input
    if (value === '' || isNaN(value)) {
      setMinutes('');
      return;
    }

    // Convert to number and validate
    const numValue = parseInt(value, 10);
    if (numValue > 59) {
      setMinutes(59);
      return;
    }
    setMinutes(Math.max(0, numValue));
  };

  return {
    hours,
    minutes,
    updateHours,
    updateMinutes,
  };
};