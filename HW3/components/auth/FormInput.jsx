/**
 * A reusable form input component that handles various input types with built-in error handling and styling.
 * Used throughout the authentication forms to maintain consistent input styling and behavior.
 * Features include label display, error messaging, and dynamic border styling based on error state.
 */

const FormInput = ({ 
    type, 
    name, 
    value, 
    onChange, 
    error, 
    label 
  }) => {
    return (
      <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`mt-1 block w-full px-3 py-2 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  };
export default FormInput;  
