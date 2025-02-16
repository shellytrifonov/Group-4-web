/**
 * Component for displaying the recipe's main image.
 * Handles responsive image sizing and positioning.
 * Supports null/missing image cases gracefully.
 * Uses object-cover for consistent image display.
 */

export const RecipeImage = ({ image, altText }) => {
  if (!image) return null;

  return (
    <div className="mb-4 w-48 h-24 md:w-64 md:h-32 self-start"> {/* Move image to the left */}
      <img
        src={image}
        alt={altText}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  );
};