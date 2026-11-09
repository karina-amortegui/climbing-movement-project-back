const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

async function dbConnect() {
  try {
    const connection = await mongoose.connect(MONGO_URI, {
      autoIndex: true,
      autoCreate: true,
    });
    console.log("connection to mongoDB successful");

    return connection;
  } catch (error) {
    console.error("MongoDB connection diagnostics:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : String(error),
      cause:
        error instanceof Error && "cause" in error
          ? String(error.cause)
          : undefined,
    });
  }
}
module.exports = dbConnect;
