/**
 * A component for managing recipe preparation instructions.
 * Provides a dynamic interface for adding and removing cooking steps.
 * Features a textarea for detailed step descriptions and easy reordering.
 * Includes remove buttons for each instruction and an add button for new steps.
 */

export const InstructionsList = ({ instructions, handleInstructionChange, removeInstruction, addInstruction }) => {
    return (
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-900">
          Instructions
        </label>
        <div id="instructionsContainer" className="space-y-2">
          {instructions.map((instruction, index) => (
            <div className="instruction-row flex items-start space-x-2 relative" key={index}>
              <textarea
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Write one or multiple steps"
                value={instruction}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => removeInstruction(index)}
                className="remove-instruction absolute -right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 text-3xl"
                aria-label="Remove"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addInstruction}
          className="flex items-center space-x-1 cursor-pointer font-bold mt-2"
          style={{ color: "#ff914d" }}
        >
          + Add Step
        </button>
      </div>
    );
  };