/**
 * API Route Handler - Manages user meal plans.
 * 
 * Handles different HTTP methods:
 * - `POST`: Creates or updates a user's meal plan.
 * - `GET`: Retrieves a user's meal plan.
 * - `DELETE`: Deletes a user's meal plan.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
import { connectToDatabase } from "@/lib/db";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    const { userId, mealPlan } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    try {
      const { db } = await connectToDatabase();

      // Check if the user already has a meal plan
      const existingMealPlan = await db.collection("meal-plans").findOne({ userId });

      if (!existingMealPlan) {
        // If no meal plan exists, create a default structure
        const defaultMealPlan = {
          Monday: { Breakfast: [], Lunch: [], Dinner: [] },
          Tuesday: { Breakfast: [], Lunch: [], Dinner: [] },
          Wednesday: { Breakfast: [], Lunch: [], Dinner: [] },
          Thursday: { Breakfast: [], Lunch: [], Dinner: [] },
          Friday: { Breakfast: [], Lunch: [], Dinner: [] },
          Saturday: { Breakfast: [], Lunch: [], Dinner: [] },
          Sunday: { Breakfast: [], Lunch: [], Dinner: [] },
        };

        await db.collection("meal-plans").insertOne({
          userId,
          mealPlan: defaultMealPlan,
          updatedAt: new Date(),
        });

        return res.status(201).json({ message: "Default meal plan created.", mealPlan: defaultMealPlan });
      }

      // If a meal plan exists, update it with the provided data
      await db.collection("meal-plans").updateOne(
        { userId },
        { $set: { mealPlan, updatedAt: new Date() } },
        { upsert: true }
      );

      res.status(200).json({ message: "Meal plan saved successfully!" });
    } catch (error) {
      console.error("Error saving meal plan:", error);
      res.status(500).json({ error: "Failed to save meal plan." });
    }
  } else if (method === "GET") {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    try {
      const { db } = await connectToDatabase();

      const mealPlan = await db.collection("meal-plans").findOne({ userId });

      if (!mealPlan) {
        return res.status(404).json({ error: "Meal plan not found." });
      }

      res.status(200).json({ mealPlan: mealPlan.mealPlan });
    } catch (error) {
      console.error("Error fetching meal plan:", error);
      res.status(500).json({ error: "Failed to fetch meal plan." });
    }
  } else if (method === "DELETE") {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    try {
      const { db } = await connectToDatabase();

      const result = await db.collection("meal-plans").deleteOne({ userId });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Meal plan not found." });
      }

      res.status(200).json({ message: "Meal plan deleted successfully!" });
    } catch (error) {
      console.error("Error deleting meal plan:", error);
      res.status(500).json({ error: "Failed to delete meal plan." });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET", "DELETE"]);
    res.status(405).json({ error: `Method ${method} not allowed.` });
  }
}