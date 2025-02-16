/**
 * validateRegistration - Validates user registration form data.
 * - Ensures the email contains an '@' symbol.
 * - Checks that the password meets security requirements:
 *   - At least 8 characters long
 *   - Contains at least one uppercase letter
 *   - Contains at least one special character
 * - Ensures that first and last names are not empty.
 * - Displays error messages in a modal when validation fails.
 */
export const validateRegistration = (formData, { setModalContent, setShowModal }) => {
  if (!formData.email.includes('@')) {
    setModalContent({
      type: 'error',
      message: 'Please enter a valid email address'
    });
    setShowModal(true);
    return false;
  }

  if (formData.password.length < 8) {
    setModalContent({
      type: 'error',
      message: 'Password must be at least 8 characters long'
    });
    setShowModal(true);
    return false;
  }

  if (!/[A-Z]/.test(formData.password)) {
    setModalContent({
      type: 'error',
      message: 'Password must contain at least one uppercase letter'
    });
    setShowModal(true);
    return false;
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
    setModalContent({
      type: 'error',
      message: 'Password must contain at least one special character'
    });
    setShowModal(true);
    return false;
  }

  if (!formData.firstName.trim() || !formData.lastName.trim()) {
    setModalContent({
      type: 'error',
      message: 'First name and last name are required'
    });
    setShowModal(true);
    return false;
  }

  return true;
};