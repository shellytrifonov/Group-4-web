/**
 * API Route Handler - Fetches recipes based on a category and retrieves unique categories for filtering.
 * 
 * Supported Method:
 * - GET: Retrieves filtered recipes and unique categories from the "recipes" collection.
 * 
 * @param {object} req - The HTTP request object.
 * @param {object} req.query - The query parameters containing:
 *   - `category` (string): The category to filter recipes by. If "all" or not provided, all recipes are fetched.
 * @param {object} res - The HTTP response object.
 */
import { connectToDatabase } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { db } = await connectToDatabase();
    const { category } = req.query;

    // Query for all recipes or filter by category
    let query = {};
    if (category && category !== "all") {
      query.recipeCategory = category;
    }

    // Get unique categories for the sidebar filter
    const categories = await db
      .collection("recipes")
      .distinct("recipeCategory");

    // Get filtered recipes
    const recipes = await db.collection("recipes").find(query).toArray();

    res.status(200).json({ recipes, categories });
  } catch (error) {
    console.error("Error in filtered recipes API:", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
}