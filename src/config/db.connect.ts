const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

let connectionPromise: Promise<any> | null = null;

async function dbConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  try {
    connectionPromise = mongoose
      .connect(MONGO_URI, {
        autoIndex: true,
        autoCreate: true,
      })
      .catch((error: unknown) => {
        connectionPromise = null;
        throw error;
      });

    const connection = await connectionPromise;

    console.log("connection to mongoDB successful");

    return connection;
  } catch (error) {
    console.error("MongoDB connection diagnostics:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : String(error),
      servers:
        error &&
        typeof error === "object" &&
        "reason" in error &&
        error.reason &&
        typeof error.reason === "object" &&
        "servers" in error.reason &&
        error.reason.servers instanceof Map
          ? Array.from(error.reason.servers.values()).map((server: any) => ({
              address: server.address,
              errorName: server.error?.name,
              errorMessage: server.error?.message,
              errorCause: server.error?.cause?.message,
            }))
          : undefined,
    });

    connectionPromise = null;
    throw error;
  }
}
module.exports = dbConnect;
