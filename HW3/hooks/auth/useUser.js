/**
 * Custom hook for accessing and managing user data.
 * Retrieves user email from local storage and determines admin status.
 * Handles parsing errors gracefully with error logging.
 * @returns {Object} Object containing user email and admin status
 */
import { useState, useEffect } from 'react';

export const useUser = () => {
  const [userEmail, setUserEmail] = useState(null);
  const isAdmin = userEmail === "admin@email.com";

  useEffect(() => {
    const fetchUserEmail = () => {
      const userInfo = localStorage.getItem("user");
      if (userInfo) {
        try {
          const parsedUser = JSON.parse(userInfo);
          setUserEmail(parsedUser.email);
        } catch (err) {
          console.error("Error parsing user info from localStorage:", err);
        }
      }
    };

    fetchUserEmail();
  }, []);

  return { userEmail, isAdmin };
};