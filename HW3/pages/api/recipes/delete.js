/**
 * API Route Handler - Deletes a specific recipe by its ID.
 * 
 * Supported Method:
 * - DELETE: Deletes a recipe from the "recipes" collection if the user is authorized.
 * 
 * @param {object} req - The HTTP request object.
 * @param {object} req.query - The query parameters containing:
 *   - `recipeId` (string): The unique identifier of the recipe.
 *   - `userEmail` (string): The email address of the user making the request.
 * @param {object} res - The HTTP response object.
 */
import { connectToDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { recipeId, userEmail } = req.query;

  if (!recipeId || !userEmail) {
    return res.status(400).json({ error: "Missing recipeId or userEmail" });
  }

  try {
    const { db } = await connectToDatabase();

    // Fetch the recipe to check ownership or admin privileges
    const recipe = await db.collection("recipes").findOne({ _id: new ObjectId(recipeId) });

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Check if the user is either the creator or an admin
    const isAdmin = userEmail === "admin@email.com";
    const isCreator = recipe.creator === userEmail;

    if (!isAdmin && !isCreator) {
      return res.status(403).json({ error: "Unauthorized to delete this recipe" });
    }

    // Proceed to delete the recipe
    const result = await db.collection("recipes").deleteOne({ _id: new ObjectId(recipeId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Recipe not found or already deleted" });
    }

    res.status(200).json({ success: true, message: "Recipe deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete recipe" });
  }
}