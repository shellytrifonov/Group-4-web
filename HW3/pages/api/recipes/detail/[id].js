/**
 * API Route Handler - Fetches the details of a specific recipe by its ID.
 * 
 * Supported Method:
 * - GET: Retrieves a recipe from the database using its unique ID.
 * 
 * @param {object} req - The HTTP request object.
 * @param {object} req.query - The query parameters containing:
 *   - `id` (string): The unique identifier of the recipe (MongoDB ObjectId).
 * @param {object} res - The HTTP response object.
 */
import { connectToDatabase } from "@/lib/db";
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { db } = await connectToDatabase();
    const recipe = await db
      .collection("recipes")
      .findOne({ _id: new ObjectId(id) });

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipe" });
  }
}