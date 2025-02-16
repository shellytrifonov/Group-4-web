/**
 * API Route Handler - Manages shopping lists for users.
 * 
 * Supported Methods:
 * - GET: Fetch all shopping lists for a given user.
 * - POST: Add a new shopping list for a user.
 * - DELETE: Delete a specific shopping list by its ID and user ID.
 * 
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
import { connectToDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { method } = req;

  try {
    const { db } = await connectToDatabase();

    switch (method) {
      case "GET": {
        const { userId } = req.query;

        if (!userId) {
          return res.status(400).json({ error: "User ID is required." });
        }

        console.log("API: Received request for userId:", userId);

        const collections = await db.listCollections().toArray();
        console.log("API: Available collections:", collections.map((c) => c.name));

        const shoppingLists = await db
          .collection("shopping-lists")
          .find({ userId })
          .toArray();

        console.log("API: Found shopping lists:", shoppingLists);

        return res.status(200).json(shoppingLists);
      }

      case "POST": {
        const { userId, recipeName, items } = req.body;

        if (!userId || !recipeName || !items) {
          return res.status(400).json({ error: "Missing required fields." });
        }

        await db.collection("shopping-lists").insertOne({
          userId,
          recipeName,
          items,
          createdAt: new Date(),
        });

        return res.status(200).json({ success: true });
      }

      case "DELETE": {
        const { listId, userId } = req.query;

        if (!listId || !userId) {
          return res.status(400).json({ error: "List ID and User ID are required." });
        }

        const result = await db.collection("shopping-lists").deleteOne({
          _id: new ObjectId(listId),
          userId,
        });

        if (result.deletedCount === 0) {
          return res.status(404).json({ error: "Shopping list not found." });
        }

        return res.status(200).json({ success: true });
      }

      default:
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        return res.status(405).json({ error: `Method ${method} not allowed.` });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}