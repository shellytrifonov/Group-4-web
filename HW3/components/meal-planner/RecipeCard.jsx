/**
 * RecipeCard component - Displays a single recipe card with recipe details.
 * Allows navigation to the recipe's detail page and includes an optional remove button.
 */
import Link from "next/link";
import Image from "next/image";

const RecipeCard = ({ recipe, onRemove }) => {
  return (
    <div className="relative bg-white dark:bg-gray-800 dark:text-white shadow rounded-lg overflow-hidden 
                    hover:shadow-lg hover:scale-105 transition-transform duration-300 
                    w-full h-[280px]">
      {/* Remove Button */}
      {onRemove && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onRemove(recipe._id);
          }}
          className="absolute top-2 right-2 text-red-600 dark:text-red-400 bg-white dark:bg-gray-700 
                     border border-red-600 dark:border-red-400 rounded-full w-8 h-8 
                     flex items-center justify-center shadow-md hover:bg-red-600 
                     dark:hover:bg-red-500 hover:text-white transition duration-300 z-10"
          aria-label="Remove Recipe"
        >
          &times;
        </button>
      )}
      <Link href={`/recipes/detail/${recipe._id}`} legacyBehavior>
        <a className="block h-full">
          <div className="relative w-full h-3/5">
            <Image
              src={recipe.recipeImage}
              alt={recipe.recipeName}
              layout="fill"
              objectFit="cover"
              quality={50}
              loading="lazy"
              placeholder="blur"
              blurDataURL={recipe.recipeImage}
              className="rounded-t-lg"
            />
          </div>
          <div className="p-4 h-2/5 bg-white dark:bg-gray-900">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate">{recipe.recipeName}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {recipe.ingredients.length} ingredients •{" "}
              {recipe.makingTime.hours > 0
                ? `${recipe.makingTime.hours} hr${recipe.makingTime.minutes > 0 ? ` ${recipe.makingTime.minutes} min` : ""}`
                : `${recipe.makingTime.minutes} min`}
            </p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default RecipeCard;