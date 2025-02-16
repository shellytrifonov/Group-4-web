/**
 * A modal component used for displaying authentication-related messages and notifications.
 * Provides a clean overlay interface for showing success/error messages during login/registration.
 * Supports both light and dark themes with responsive design and smooth transitions.
 */

const Modal = ({ show, content, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-black dark:text-orange-400 shadow-lg dark:shadow-orange-500 rounded-lg p-6 text-center max-w-sm w-full">
        <p className="text-gray-900 dark:text-orange-400">{content.message}</p>
        <button 
          onClick={onClose} 
          className="mt-4 px-4 py-2 bg-orange-500 dark:bg-orange-400 text-white dark:text-black rounded-lg shadow-md hover:bg-orange-600 dark:hover:bg-orange-500 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;