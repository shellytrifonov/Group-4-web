import { useState, useEffect } from "react";
import RecipeCard from "../../components/recipes/RecipeCard";
import Loading from "../../components/Loading";

export default function AllRecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState(null); // Store logged-in user's email
  const isAdmin = userEmail === "admin@email.com"; // Check if admin is logged in

  useEffect(() => {
    // Fetch logged-in user's email from localStorage
    const fetchUserEmail = () => {
      const userInfo = localStorage.getItem("user");
      if (userInfo) {
        try {
          const parsedUser = JSON.parse(userInfo); // Parse JSON string
          setUserEmail(parsedUser.email); // Set the user's email
        } catch (err) {
          console.error("Error parsing user info from localStorage:", err);
        }
      } else {
        console.warn("No user info found in localStorage.");
      }
    };

    fetchUserEmail();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/recipes/filtered?category=${selectedCategory}`
        );
        if (!response.ok) {
          throw new Error(`Error fetching recipes: ${response.statusText}`);
        }
        const data = await response.json();
        setRecipes(data.recipes);
        setCategories(data.categories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [selectedCategory]);

  const handleRemoveRecipe = async (recipeId) => {
    const user = JSON.parse(localStorage.getItem("user")); // Retrieve user info from localStorage
  
    // Show confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe? This action cannot be undone.");
    if (!confirmDelete) {
      return; // Exit if the user cancels
    }
  
    try {
      const response = await fetch(`/api/recipes/delete?recipeId=${recipeId}&userEmail=${user.email}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        console.log("Recipe deleted successfully");
      } else {
        const errorData = await response.json();
        console.error("Failed to delete recipe:", errorData.error);
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <Loading loading={loading} error={error} />
      {!loading && !error && (
        <>
          <h1 className="text-3xl font-bold text-center mb-8">All Recipes</h1>
          <div className="flex">
            {/* Sidebar Filter */}
            <div className="w-64 pr-8 recipe-box">
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-semibold mb-4">Categories</h2>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left px-3 py-2 rounded ${
                      selectedCategory === "all"
                        ? "bg-gray-500 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded ${
                        selectedCategory === category
                          ? "bg-gray-500 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
  
            {/* Recipe Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe._id}
                    recipe={recipe}
                    onRemove={isAdmin ? handleRemoveRecipe : null}
                  />
                ))}
              </div>
  
              {recipes.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No recipes found in this category.</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );  
}