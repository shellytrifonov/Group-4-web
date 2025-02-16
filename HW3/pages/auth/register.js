/**
 * Register - User registration page.
 * - Manages user input for registration fields (name, email, password, food preferences).
 * - Handles form validation using `validateRegistration`.
 * - Sends registration data to the `useRegister` hook for user creation.
 * - Displays a modal (`Modal`) for feedback messages.
 */
import { useRegister } from '../../hooks/auth/useRegister';
import { useForm } from '../../hooks/auth/useForm';
import { useState } from 'react';
import { validateRegistration } from '../../lib/validation';
import RegistrationForm from '../../components/auth/RegistrationForm';
import Modal from '../../components/auth/Modal';
import Form from '../../components/shared/Form';

export default function Register() {
  const { formData, handleInputChange, handleCheckboxChange } = useForm({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    foodPreferences: []
  });

  const { register, showModal, setShowModal, modalContent, setModalContent } = useRegister();
  const [profileImage, setProfileImage] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input before sending request
    if (!validateRegistration(formData, { setModalContent, setShowModal })) return;

    // Register user with form data and optional profile image
    await register(formData, profileImage);
  };

  return (
    <main className="flex-grow container mx-auto py-8">
      <section className="form-section py-8 flex justify-center">
        {/* Registration Form */}
        <Form title="Create Your Account" onSubmit={handleSubmit}>
          <RegistrationForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            setProfileImage={setProfileImage}
          />
        </Form>
      </section>

      {/* Modal for success or error messages */}
      <Modal 
        show={showModal}
        content={modalContent}
        onClose={() => setShowModal(false)}
      />
    </main>
  );
}