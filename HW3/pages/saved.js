/**
 * Saved - displaying saved recipes.
 */
import { useSavedRecipes } from '../hooks/saved/useSavedRecipes';
import { EmptySaved } from '../components/saved/EmptySaved';
import { SavedRecipesList } from '../components/saved/SavedRecipesList';
import Loading from "../components/shared/Loading";

export default function Saved() {
  const { savedRecipes, loading, handleDelete } = useSavedRecipes();

  // Show loading indicator while data is being fetched
  if (loading) {
    return <Loading loading={loading} error={null} />;
  }

  // Show empty state if no saved recipes exist
  if (savedRecipes.length === 0) {
    return <EmptySaved />;
  }

  // Display the list of saved recipes
  return <SavedRecipesList recipes={savedRecipes} onDelete={handleDelete} />;
}