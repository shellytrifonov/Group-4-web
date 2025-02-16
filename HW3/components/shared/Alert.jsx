/**
 * Alert component for displaying temporary notifications.
 * Supports success and error message types with appropriate icons.
 * Features automatic dismissal after specified duration.
 * Styled with transitions and responsive design.
 * Adapts to light/dark themes with appropriate color schemes.
 */

import React from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useAlert } from "@/hooks/alert/useAlert";

const Alert = ({ message, type = 'success', onClose, duration = 2300 }) => {
  const {isVisible} = useAlert(duration, onClose);

  if (!isVisible) return null; // Hide alert when it disappears

  return (
    <div 
      className={`fixed top-5 right-5 z-50 flex items-center max-w-sm px-4 py-3 rounded-lg shadow-lg
        transition-opacity duration-300 filter-none bg-opacity-100 backdrop-blur-none
        ${type === 'error' 
          ? 'bg-red-500 text-white dark:bg-black-600 dark:text-white dark:shadow-[0_0_10px_#ff914d]' 
          : 'bg-orange-500 text-white dark:bg-black-600 dark:text-white dark:shadow-[0_0_10px_#ff914d]'}`}
    >
      {type === 'error' ? (
        <XCircleIcon className="w-6 h-6 mr-3 text-white" />
      ) : (
        <CheckCircleIcon className="w-6 h-6 mr-3 text-white" />
      )}
      <p className="text-sm font-medium text-opacity-100 antialiased subpixel-antialiased">
        {message}
      </p>
    </div>
  );
};

export default Alert;