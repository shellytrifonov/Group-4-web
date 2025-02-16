/**
 * MongoDB Connection Utility
 * 
 * Provides a reusable connection to the MongoDB database, supporting both development
 * and production environments. In development, it reuses the client instance across 
 * hot-reloads to prevent exhausting database connection limits.
 * 
 * @throws {Error} If the `MONGO_URI` environment variable is not defined.
 * 
 * Exports:
 * - `connectToDatabase`: Asynchronous function to establish a connection to the database.
 * 
 * @returns {Promise<{client: MongoClient, db: Db}>} - An object containing:
 *   - `client`: The connected MongoClient instance.
 *   - `db`: The connected database instance.
 */
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export const connectToDatabase = async () => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB_NAME);
  return { client, db };
};