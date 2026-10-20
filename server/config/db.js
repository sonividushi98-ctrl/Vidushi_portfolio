const mongoose = require("mongoose");

async function connectMemoryMongo() {
  const { MongoMemoryServer } = require("mongodb-memory-server");
  const memory = await MongoMemoryServer.create();
  const uri = memory.getUri();
  await mongoose.connect(uri);
  console.log("[mongo] local URI failed. Using in-memory MongoDB for development.");
  console.log("[mongo] connected to in-memory database");
}

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri || !uri.trim()) {
    console.error(
      "[mongo] MONGODB_URI is missing. Add it to server/.env (see server/.env.example)."
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log(`[mongo] connected to ${mongoose.connection.name}`);
  } catch (error) {
    console.error("[mongo] connection failed:", error.message);
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
    try {
      await connectMemoryMongo();
    } catch (memoryError) {
      console.error("[mongo] in-memory fallback failed:", memoryError.message);
      process.exit(1);
    }
  }
}

module.exports = { connectDB };
