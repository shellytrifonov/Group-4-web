/**
 * Custom hook for managing recipe instructions
 * Handles adding, removing, and updating instruction steps
 */
import { useState } from 'react';

export const useInstructions = () => {
  const [instructions, setInstructions] = useState(['']);

  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const removeInstruction = (index) => {
    if (index === 0 && instructions.length === 1) {
      alert("Recipe must have at least one instruction");
      return;
    }
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index] = value;
    setInstructions(updatedInstructions);
  };

  return { 
    instructions, 
    addInstruction, 
    removeInstruction, 
    handleInstructionChange,
    setInstructions // Expose setInstructions for form reset
  };
};