/**
 * API Route Handler - Fetches recipes created by a specific user.
 * 
 * Supported Method:
 * - GET: Retrieves recipes from the "recipes" collection where the `creator` matches the provided email.
 * 
 * @param {object} req - The HTTP request object.
 * @param {object} req.query - The query parameters containing:
 *   - `email` (string): The email address of the user whose recipes should be fetched.
 * @param {object} res - The HTTP response object.
 */
import { connectToDatabase } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.query;

  try {
    const { db } = await connectToDatabase();
    const recipes = await db.collection("recipes")
      .find({ creator: email })
      .toArray();

    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
}