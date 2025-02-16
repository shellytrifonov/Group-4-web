// hooks/auth/useRegister.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { toBase64 } from '../../lib/fileUtils';

/**
 * Custom hook for handling user registration process.
 * Manages form submission, profile image upload, and registration success/error states.
 * Includes modal feedback for registration status.
 * @returns {Object} Object containing register function and modal state handlers
 */
export const useRegister = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ type: '', message: '' });

  const register = async (formData, profileImage) => {
    try {
      let base64Image = "";
      if (profileImage) {
        base64Image = await toBase64(profileImage);
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, profileImage: base64Image }),
      });

      const data = await response.json();

      if (data.success) {
        setModalContent({
          type: 'success',
          message: 'Registration successful! Welcome to Plan & Plate!'
        });
        setShowModal(true);
        
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      } else {
        throw new Error(data.error || 'Registration failed');
      }
    } catch (error) {
      setModalContent({
        type: 'error',
        message: error.message || 'Registration failed. Please try again.'
      });
      setShowModal(true);
    }
  };

  return { register, showModal, setShowModal, modalContent, setModalContent };
};