/**
 * RecipeCreator - for creating a new recipe.
 * Uses custom hooks for managing different aspects of recipe creation.
 */
import Form from "../../components/shared/Form";
import Alert from "../../components/shared/Alert";
import { useAuthVerification } from "../../hooks/auth/useAuthVerification";
import { useIngredients } from "../../hooks/creator-recipe/useIngredients";
import { useInstructions } from "../../hooks/creator-recipe/useInstructions";
import { useRecipeBasicInfo } from "../../hooks/creator-recipe/useRecipeBasicInfo";
import { useNutrition } from "../../hooks/creator-recipe/useNutrition";
import { useMakingTime } from "../../hooks/creator-recipe/useMakingTime";
import { useRecipeSubmission } from "../../hooks/creator-recipe/useRecipeSubmission";
import { useRecipeForm } from "../../hooks/creator-recipe/useRecipeForm";
import { RecipeBasicInfo } from "../../components/creator-recipe/RecipeBasicInfo";
import { MakingTime } from "../../components/creator-recipe/MakingTime";
import { IngredientsList } from "../../components/creator-recipe/IngredientsList";
import { InstructionsList } from "../../components/creator-recipe/InstructionsList";
import { NutritionInfo } from "../../components/creator-recipe/NutritionInfo";
import { fixNumber } from "../../lib/numberUtils";

export default function RecipeCreator() {
  const { user } = useAuthVerification();
  
  // Custom hooks for different parts of the recipe
  const { ingredients, addIngredient, removeIngredient, handleIngredientChange, setIngredients } = useIngredients();
  const { instructions, addInstruction, removeInstruction, handleInstructionChange, setInstructions } = useInstructions();
  const { recipeName, setRecipeName, recipeCategory, setRecipeCategory, recipeImage, setRecipeImage, isBasicInfoComplete } = useRecipeBasicInfo();
  const { nutrition, handleNutritionChange, setNutrition } = useNutrition();
  const { hours, minutes, updateHours, updateMinutes } = useMakingTime();
  const { submitRecipe } = useRecipeSubmission(user);
  const { alert, setAlert, handleSubmit } = useRecipeForm(user, submitRecipe);

  const formData = {
    recipeName,
    recipeCategory,
    makingTime: { hours, minutes },
    nutrition,
    ingredients,
    instructions,
    recipeImage,
    isBasicInfoComplete,
    // Add setter functions for form reset
    setRecipeName,
    setRecipeCategory,
    setRecipeImage,
    setIngredients,
    setInstructions,
    updateHours,
    updateMinutes,
    setNutrition
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-3xl w-full p-6 bg-white dark:bg-gray-800 rounded-lg flex flex-col justify-center items-center" style={{ height: "100%" }}>
        {/* Recipe creation form */}
        <Form onSubmit={(e) => handleSubmit(e, formData)} title="Create a Recipe">
          <RecipeBasicInfo
            recipeName={recipeName}
            setRecipeName={setRecipeName}
            recipeCategory={recipeCategory}
            setRecipeCategory={setRecipeCategory}
            recipeImage={recipeImage}
            setRecipeImage={setRecipeImage}
          />

          <MakingTime 
            hours={hours} 
            minutes={minutes} 
            updateHours={updateHours} 
            updateMinutes={updateMinutes} 
          />

          <IngredientsList
            ingredients={ingredients}
            handleIngredientChange={handleIngredientChange}
            removeIngredient={removeIngredient}
            addIngredient={addIngredient}
            fixNumber={fixNumber}
          />

          <InstructionsList
            instructions={instructions}
            handleInstructionChange={handleInstructionChange}
            removeInstruction={removeInstruction}
            addInstruction={addInstruction}
          />

          <NutritionInfo
            nutrition={nutrition}
            handleNutritionChange={handleNutritionChange}
            fixNumber={fixNumber}
          />

          {/* Submit button */}
          <div className="flex justify-center">
            <button 
              type="submit" 
              className="btn"
            >
              Submit
            </button>
          </div>
        </Form>
      </div>

      {/* Alert message for form submission feedback */}
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
    </div>
  );
}