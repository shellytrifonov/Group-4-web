/**
 * CategoryPage - Displays recipes based on the selected category.
 */
import { useRouter } from "next/router";
import { useRecipesCategory } from "../../hooks/recipes/category/useRecipesCategory";
import { CategoryRecipeGrid } from "../../components/recipes/category/CategoryRecipeGrid";
import Loading from "../../components/shared/Loading";

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const { recipes, loading, error } = useRecipesCategory(category);

  // Show loading indicator while data is being fetched
  if (loading) {
    return <Loading loading={loading} error={null} />;
  }

  return (
    <div className="container mx-auto py-8">
      {/* Page Title: Display category name or 'All Recipes' */}
      <h1 className="text-3xl font-bold text-center mb-8">
        {category === "all" ? "All Recipes" : `${category} Recipes`}
      </h1>

      {/* Display recipes in a grid format */}
      <CategoryRecipeGrid recipes={recipes} />
    </div>
  );
}