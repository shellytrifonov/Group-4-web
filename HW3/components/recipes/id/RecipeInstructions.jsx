export const RecipeInstructions = ({ instructions }) => {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
        <ol className="list-decimal pl-6">
          {instructions.map((instruction, index) => (
            <li key={index} className="mb-2">
              {instruction}
            </li>
          ))}
        </ol>
      </div>
    );
  };