/**
 * API Route Handler - Checks if a specific recipe is saved by a user.
 * 
 * Supported Method:
 * - GET: Determines if a recipe is saved in the "saved" collection for the given user.
 * 
 * @param {object} req - The HTTP request object.
 * @param {object} req.query - The query parameters containing:
 *   - `id` (string): The unique identifier of the recipe.
 * @param {object} req.headers - The HTTP headers containing:
 *   - `user-email` (string): The email address of the user.
 * @param {object} res - The HTTP response object.
 */
import { connectToDatabase } from "@/lib/db";

export default async function handler(req, res) {
  const { id } = req.query;
  const email = req.headers['user-email'];

  try {
    const { db } = await connectToDatabase();
    const savedRecipe = await db.collection("saved").findOne({
      userId: email,
      recipeId: id
    });

    res.status(200).json({ isSaved: !!savedRecipe });
  } catch (error) {
    res.status(500).json({ error: "Failed to check save status" });
  }
}