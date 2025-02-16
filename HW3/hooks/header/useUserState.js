/**
 * Custom hook for managing user authentication state in the header.
 * Tracks login status, user name, and profile picture.
 * Listens for login/logout events and updates state accordingly.
 * Provides fallback values for user name and profile picture.
 * @returns {Object} Object containing user login state, name, and profile picture URL
 */
import { useState, useEffect } from "react";

const useUserState = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPic, setUserPic] = useState("/images/defaultprofile.jpg");

  useEffect(() => {
    const updateUserState = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setIsLoggedIn(true);
        setUserName(user.firstName || "User");
        setUserPic(user.profileImage || "/images/defaultprofile.jpg");
      } else {
        setIsLoggedIn(false);
        setUserName("");
        setUserPic("/images/defaultprofile.jpg");
      }
    };

    updateUserState();
    window.addEventListener("userLoggedIn", updateUserState);
    window.addEventListener("userLoggedOut", updateUserState);

    return () => {
      window.removeEventListener("userLoggedIn", updateUserState);
      window.removeEventListener("userLoggedOut", updateUserState);
    };
  }, []);

  return { isLoggedIn, userName, userPic };
};

export default useUserState;