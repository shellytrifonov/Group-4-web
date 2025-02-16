/**
 * AllRecipesPage - Displays a searchable and filterable list of recipes.
 */
import { useState } from "react";
import Loading from "../../components/shared/Loading";
import SearchBar from "../../components/recipes/all-recipes/SearchBar";
import { CategorySidebar } from "../../components/recipes/all-recipes/CategorySidebar";
import { AllRecipesGrid } from "../../components/recipes/all-recipes/AllRecipesGrid";
import { useRecipes } from "../../hooks/recipes/all-recipes/useRecipes";
import { useUser } from "../../hooks/auth/useUser";
import { useRecipeSearch } from "../../hooks/recipes/all-recipes/useRecipeSearch";
import { handleRemoveRecipe } from "../../lib/recipes";

export default function AllRecipesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { recipes, filteredRecipes, setFilteredRecipes, categories, loading, error } = useRecipes(selectedCategory);
  const { isAdmin } = useUser();
  
  // Search Hook: Filters recipes based on search input
  useRecipeSearch(searchTerm, recipes, setFilteredRecipes);

  // Handles recipe removal (only for admin users)
  const onRemoveRecipe = async (recipeId) => {
    const success = await handleRemoveRecipe(recipeId);
    if (success) {
      setFilteredRecipes(prevRecipes => 
        prevRecipes.filter(recipe => recipe._id !== recipeId)
      );
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 lg:px-8">
      {/* Show loading indicator or error message */}
      <Loading loading={loading} error={error} />

      {!loading && !error && (
        <>
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-center mb-6 md:mb-8">Recipes</h1>

          {/* Search Bar + Toggle Categories Button */}
          <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
              {/* Toggle Button for Mobile & iPads */}
              <button
                className="bg-orange-500 text-white px-4 py-2.5 rounded-md lg:hidden w-full sm:w-auto 
                          hover:bg-orange-600 transition-colors duration-200 text-lg touch-manipulation"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? "Hide Categories" : "Show Categories"}
              </button>

              <SearchBar
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-[300px] md:w-[400px]"
              />
            </div>

            {/* Categories BELOW Search Bar (Mobile & Tablets) */}
            {isSidebarOpen && (
              <div className="w-full lg:hidden mt-4 bg-white shadow-md rounded-lg p-4 
                            border border-gray-100">
                <CategorySidebar
                  categories={categories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </div>
            )}
          </div>

          {/* Main Content Layout */}
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 mt-6 md:mt-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:w-1/4 xl:w-1/5">
              <div className="sticky top-4">
                <CategorySidebar
                  categories={categories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </div>
            </div>

            {/* Recipe Grid */}
            <div className="w-full lg:w-3/4 xl:w-4/5">
              <AllRecipesGrid
                filteredRecipes={filteredRecipes}
                handleRemoveRecipe={onRemoveRecipe}
                isAdmin={isAdmin}
                className="grid grid-cols-1 sm:grid-cols-2 
                          md:grid-cols-2 
                          lg:grid-cols-2 
                          min-[1024px]:grid-cols-3 
                          xl:grid-cols-4 
                          gap-4 md:gap-6 
                          px-2 md:px-0"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}