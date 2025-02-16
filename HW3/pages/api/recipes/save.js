/**
 * API Route Handler - Handles saving and unsaving recipes for a user.
 * 
 * Supported Method:
 * - POST: Saves or unsaves a recipe in the "saved" collection based on the action.
 * 
 * @param {object} req - The HTTP request object.
 * @param {object} req.body - The request body containing:
 *   - `recipeId` (string): The unique identifier of the recipe.
 *   - `action` (string): The action to perform, either "save" or "unsave".
 *   - `email` (string): The email address of the user performing the action.
 * @param {object} res - The HTTP response object.
 */
import { connectToDatabase } from "@/lib/db";

export default async function handler(req, res) {
 if (req.method !== "POST") {
   return res.status(405).json({ error: "Method not allowed" });
 }

 const { recipeId, action, email } = req.body;

 try {
   const { db } = await connectToDatabase();
   
   if (action === 'save') {
     await db.collection("saved").insertOne({
       userId: email,
       recipeId,
       savedAt: new Date()
     });
   } else if (action === 'unsave') {
     await db.collection("saved").deleteOne({
       userId: email,
       recipeId
     });
   }
   
   res.status(200).json({ message: `Recipe ${action}d successfully` });
 } catch (error) {
   res.status(500).json({ error: "Failed to save recipe" });
 }
}