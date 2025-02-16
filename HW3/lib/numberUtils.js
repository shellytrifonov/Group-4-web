// Ensures a valid number format by removing leading zeros
export const fixNumber = (value) => {
  if (!value || isNaN(value)) return 0;
  return Math.max(0, parseInt(value, 10)); // Ensures integer values only
};