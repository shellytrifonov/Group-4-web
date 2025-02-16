/**
 * API Route Handler - Handles the creation of a new recipe.
 * 
 * Supported Method:
 * - POST: Accepts recipe data, optimizes the provided image, and saves the recipe in the database.
 * 
 * @param {object} req - The HTTP request object.
 * @param {object} req.body - The request body containing the following fields:
 */
import { MongoClient } from "mongodb";
import sharp from "sharp";

const client = new MongoClient(process.env.MONGO_URI);
export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      recipeName,
      recipeCategory,
      makingTime,
      nutrition,
      ingredients,
      instructions,
      recipeImage, // Base64 encoded image
    } = req.body;

    try {
      await client.connect();
      const database = client.db(process.env.MONGO_DB_NAME);
      const recipesCollection = database.collection("recipes");

      // Check if recipeImage is provided
      if (!recipeImage) {
        return res.status(400).json({ message: "Recipe image is required." });
      }

      // Convert base64 image to buffer
      const base64Image = recipeImage.split(";base64,").pop();
      const imageBuffer = Buffer.from(base64Image, "base64");

      // Process the image: resize and convert to WebP
      const webpBuffer = await sharp(imageBuffer)
        .resize({ width: 300, fit: "contain" })
        .webp({ quality: 40 })
        .toBuffer();

      // Convert back to base64
      const webpBase64 = `data:image/webp;base64,${webpBuffer.toString("base64")}`;

      // Create the recipe object
      const newRecipe = {
        recipeName,
        recipeCategory,
        makingTime,
        nutrition,
        ingredients,
        instructions,
        recipeImage: webpBase64, // Store optimized image in WebP format
      };

      // Insert the new recipe into the database
      const result = await recipesCollection.insertOne(newRecipe);

      // Return success response
      res.status(201).json({
        message: "Recipe saved successfully!",
        recipeId: result.insertedId,
      });
    } catch (error) {
      console.error("Error saving recipe:", error);
      res.status(500).json({ message: "Error saving recipe." });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}