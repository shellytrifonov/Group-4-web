/**
 * The main registration form component for user sign-up.
 * Handles user profile creation with fields for personal information and food preferences.
 * Includes form validation and image upload functionality for profile pictures.
 * Uses FormInput components for consistent form field styling and behavior.
 */

import FormInput from '../auth/FormInput';

const RegistrationForm = ({ 
  formData, 
  handleInputChange, 
  handleCheckboxChange,
  setProfileImage 
}) => {
  const foodPreferences = ["Side-Dishes", "Soup", "Salad", "Main-Dish", "Dessert"];

  return (
    <>
      <FormInput
        type="text"
        name="firstName"
        label="First Name"
        value={formData.firstName}
        onChange={handleInputChange}
        placeholder="Enter first name"
        required
      />

      <FormInput
        type="text"
        name="lastName"
        label="Last Name"
        value={formData.lastName}
        onChange={handleInputChange}
        placeholder="Enter last name"
        required
      />

      <FormInput
        type="email"
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="name@company.com"
        required
      />

      <div className="mb-4">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <ul className="text-sm text-gray-500 list-disc list-inside pl-2 mt-2">
          <li>At least 8 characters long</li>
          <li>Contains at least one uppercase letter</li>
          <li>Contains at least one special character (e.g., @, #, $)</li>
        </ul>
      </div>

      <div className="mb-4">
        <label htmlFor="profileImage" className="block mb-2 text-sm font-medium text-gray-900">
          Profile Picture
        </label>
        <input
          type="file"
          id="profileImage"
          accept="image/jpeg, image/png"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          onChange={(e) => setProfileImage(e.target.files[0])}
        />
        <p className="text-sm text-gray-500 mt-1">
          Supported formats: JPG, PNG.
        </p>
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Food Preferences
        </label>
        <div className="space-y-3 bg-gray-50 border border-gray-300 rounded-lg p-3">
          {foodPreferences.map((preference) => (
            <div key={preference} className="flex items-center">
              <input
                type="checkbox"
                id={preference}
                name="foodPreferences"
                value={preference}
                checked={formData.foodPreferences.includes(preference)}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor={preference} className="ml-2 text-sm text-gray-900">
                {preference.replace('-', ' ')}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button type="submit" className="btn">
          Sign Up
        </button>
      </div>
    </>
  );
};

export default RegistrationForm;