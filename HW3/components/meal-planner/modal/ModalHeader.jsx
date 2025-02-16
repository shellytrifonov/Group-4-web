/**
 * ModalHeader component - Displays the header section of the recipes modal.
 * Contains close button, title, and search functionality.
 */
import SearchBar from "../../recipes/all-recipes/SearchBar";

const ModalHeader = ({ onClose, title, searchQuery, onSearchChange }) => {
  return (
    <div className="modal-header flex justify-between items-center p-4 border-b dark:border-gray-700">
      <button
        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        onClick={onClose}
      >
        X
      </button>
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="relative ml-4">
        <SearchBar
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>
    </div>
  );
};

export default ModalHeader;