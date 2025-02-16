import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * Custom hook for verifying user authentication status.
 * Checks local storage for user data and redirects to login if not authenticated.
 * @returns {Object} Object containing the current user data
 */
export const useAuthVerification = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    if (!userInfo) {
      router.push('/auth/signin');
      return;
    }
    setUser(JSON.parse(userInfo));
  }, []);

  return { user };
};
