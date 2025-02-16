/**
 * A component for inputting recipe preparation time.
 * Provides separate input fields for hours and minutes.
 * Includes number validation and formatting for time inputs.
 * Used to specify how long a recipe takes to prepare and cook.
 */
import { useState, useEffect } from "react";

export const MakingTime = ({ hours, minutes, updateHours, updateMinutes }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleTimeChange = (value, setter, max = null) => {
    if (!hydrated) return;

    // Remove leading zeros
    value = value.replace(/^0+/, '');

    // Allow only digits
    if (!/^\d*$/.test(value)) return;

    let num = parseInt(value || "0", 10);

    // Limit minutes to 59
    if (max !== null && num > max) {
      num = max;
    }

    setter(num);
  };

  if (!hydrated) return null;

  return (
    <div className="mb-4 flex flex-col">
      <label className="block text-sm font-medium mb-2 text-gray-900">
        Preparation Time (HH:MM)
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 appearance-none"
          placeholder="Hours"
          value={hours || ""}
          onChange={(e) => handleTimeChange(e.target.value, updateHours)}
        />
        <span className="text-lg font-semibold">:</span>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 appearance-none"
          placeholder="Minutes"
          value={minutes || ""}
          onChange={(e) => handleTimeChange(e.target.value, updateMinutes, 59)}
        />
      </div>
    </div>
  );
};