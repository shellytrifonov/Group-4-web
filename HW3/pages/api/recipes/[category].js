/**
 * API Route Handler - Fetches recipes by category or all recipes if "all" is specified.
 * 
 * Supported Method:
 * - GET: Retrieves recipes from the "recipes" collection based on the specified category.
 * 
 * @param {object} req - The HTTP request object.
 * @param {object} req.query - The query parameters containing:
 *   - `category` (string): The category of recipes to fetch. Use "all" to fetch all recipes.
 * @param {object} res - The HTTP response object.
 */
import { connectToDatabase } from "@/lib/db";

export default async function handler(req, res) {
  const { category } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { db } = await connectToDatabase();

    const recipes =
      category === "all"
        ? await db.collection("recipes").find({}).toArray()
        : await db
            .collection("recipes")
            .find({ recipeCategory: category })
            .toArray();

    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
}
