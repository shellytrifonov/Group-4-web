/**
 * handleRemoveRecipe - Handles the removal of a recipe with user confirmation.
 * - Displays a custom confirmation modal when a user tries to delete a recipe.
 * - Makes an HTTP `DELETE` request to the API to remove the specified recipe if confirmed.
 * - Handles success and error cases, including API errors and network failures.
 */
export const handleRemoveRecipe = async (recipeId) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Create confirmation modal element
  const confirmDiv = document.createElement('div');
  confirmDiv.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  confirmDiv.innerHTML = `
    <div class="bg-white rounded-lg p-6 max-w-sm w-full mx-4 transform -translate-y-1/4">
      <p class="text-gray-600 mb-6 text-center">Are you sure you want to delete this recipe?</p>
      <div class="flex justify-center gap-4">
        <button class="btn btn-secondary" id="cancelDelete">Cancel</button>
        <button class="btn" id="confirmDelete">Delete</button>
      </div>
    </div>
  `;

  document.body.appendChild(confirmDiv);

  return new Promise((resolve) => {
    document.getElementById('cancelDelete').onclick = () => {
      document.body.removeChild(confirmDiv);
      resolve(false);
    };

    document.getElementById('confirmDelete').onclick = async () => {
      document.body.removeChild(confirmDiv);
      try {
        const response = await fetch(`/api/recipes/delete?recipeId=${recipeId}&userEmail=${user.email}`, {
          method: "DELETE",
        });

        if (response.ok) {
          console.log("Recipe deleted successfully");
          resolve(true);
        } else {
          const errorData = await response.json();
          console.error("Failed to delete recipe:", errorData.error);
          resolve(false);
        }
      } catch (error) {
        console.error("Error deleting recipe:", error);
        resolve(false);
      }
    };
  });
};