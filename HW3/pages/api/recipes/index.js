/**
 * API Route Handler - Creates a new recipe in the "recipes" collection.
 * 
 * Supported Method:
 * - POST: Inserts a new recipe document into the database.
 * 
 * @param {object} req - The HTTP request object.
 * @param {object} req.body - The request body containing the recipe data.
 * @param {object} res - The HTTP response object.
 */
import { connectToDatabase } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { db } = await connectToDatabase();
    const recipeData = req.body;

    const result = await db.collection("recipes").insertOne(recipeData);

    res.status(201).json({ 
      message: "Recipe created successfully",
      recipeId: result.insertedId 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create recipe" });
  }
}