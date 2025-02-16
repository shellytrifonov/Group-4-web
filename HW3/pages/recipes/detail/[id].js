/**
 * RecipeDetailPage - Displays detailed information about a specific recipe.
 */
import { useRouter } from 'next/router';
import Loading from '../../../components/shared/Loading';
import Alert from '../../../components/shared/Alert';
import { useRecipesDetail } from '../../../hooks/recipes/detail/useRecipesDetail';
import { useSaveRecipe } from '../../../hooks/recipes/detail/useSaveRecipe';
import { useShoppingListDetail } from '../../../hooks/recipes/detail/useShoppingListDetail';
import { RecipeHeader } from '../../../components/recipes/id/RecipeHeader';
import { RecipeImage } from '../../../components/recipes/id/RecipeImage';
import { RecipeDetails } from '../../../components/recipes/id/RecipeDetails';
import { RecipeIngredients } from'../../../components/recipes/id/RecipeIngredients';
import { RecipeInstructions } from '../../../components/recipes/id/RecipeInstructions';

export default function RecipeDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const { recipe, loading, error } = useRecipesDetail(id);
  const { isSaved, saveLoading, handleSaveToggle, alert: saveAlert, setAlert: setSaveAlert } = useSaveRecipe(id);
  const { alert: orderAlert, setAlert: setOrderAlert, handleOrder } = useShoppingListDetail();
  

  // Show loading indicator while fetching data
  if (loading) {
    return <Loading loading={loading} error={null} />;
  }
  
  // Handle error state or missing recipe
  if (error) return <p>Error: {error}</p>;
  if (!recipe) return <p>Recipe not found</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Recipe header with title and action buttons */}
        <RecipeHeader 
          recipe={recipe}
          isSaved={isSaved}
          saveLoading={saveLoading}
          onSave={handleSaveToggle}
          onOrder={() => handleOrder(recipe)}
        />

        {/* Recipe image */}
        <RecipeImage 
          image={recipe.recipeImage}
          altText={recipe.recipeName}
        />

        {/* Recipe details section */}
        <RecipeDetails recipe={recipe} />

        {/* Ingredients list */}
        <RecipeIngredients ingredients={recipe.ingredients} />

        {/* Cooking instructions */}
        <RecipeInstructions instructions={recipe.instructions} />
      </div>

        {/* Alert message for saving or ordering */}
        {(saveAlert || orderAlert) && (
          <Alert
            message={saveAlert ? saveAlert.message : orderAlert.message}
            type={saveAlert ? saveAlert.type : orderAlert.type}
            onClose={() => {
              if (saveAlert) setSaveAlert(null);
              if (orderAlert) setOrderAlert(null);
            }}
          />
        )}
    </div>
  );
}