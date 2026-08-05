const mongoose = require("mongoose");

const MONGO_URI = "mongodb://localhost:27017/climbing-movement-project";

async function dbConnect() {
  try {
    const connection = await mongoose.connect(MONGO_URI, {
      autoIndex: true,
      autoCreate: true,
    });
    console.log("connection to mongoDB successful");

    return connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return null;
  }
}

module.exports = dbConnect;
