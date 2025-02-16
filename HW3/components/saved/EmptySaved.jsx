/**
 * Empty state component for the saved recipes page.
 * Displays when user has no saved recipes.
 * Shows a friendly message, illustration, and call-to-action button.
 * Provides direct navigation to browse all recipes.
 */
export const EmptySaved = () => {
    return (
      <main className="max-w-3xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold leading-tight mb-8 text-gray-800 text-center">
          Saved Recipes
        </h2>
        <p className="text-lg text-gray-600 text-center">
          No saved items yet. Browse through the recipes and save the ones you love!
        </p>
        <img
          src="/images/saved.jpg"
          alt="No saved recipes"
          className="mx-auto mt-8 mb-8 rounded-lg shadow-lg max-w-sm w-full h-auto"
        />
        <div className="mt-6 flex justify-center">
          <a href="/recipes/all-recipes" className="btn whitespace-nowrap min-w-[150px]">
            Browse Recipes
          </a>
        </div>
      </main>
    );
  };