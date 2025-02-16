/**
 * Action buttons component for meal planner operations.
 * Provides Save Plan and Delete Plan functionality.
 * Buttons are styled consistently and have minimum width for better UX.
 * Used at the bottom of the meal planner to manage meal plan state.
 */

import React from 'react';

export const ActionButtons = ({ onSave, onDelete }) => {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <button
        className="btn whitespace-nowrap min-w-[150px]"
        onClick={onSave}
      >
        Save Plan
      </button>
      <button
        className="btn whitespace-nowrap min-w-[150px]"
        onClick={onDelete}
      >
        Delete Plan
      </button>
    </div>
  );
};
export default ActionButtons;