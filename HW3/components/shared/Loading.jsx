/**
 * Loading component - Handles the display of loading indicators or error messages.
 * Returns null if neither loading nor error states are active.
 */
import React from "react";

const Loading = ({ loading, error }) => {
    if (loading) {
      return (
        <div
          className="container flex justify-center items-center mx-auto py-8"
          style={{ height: "70vh" }}
        >
          <img src="/loading.gif" alt="loading" style={{ height: "20%", width: "10%" }} />
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="container flex justify-center items-center mx-auto py-8">
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      );
    }
  
    return null; // Return null if no loading or error
  };
  
  export default Loading;  