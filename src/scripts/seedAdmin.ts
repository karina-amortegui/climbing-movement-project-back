require("dotenv").config();

require("dotenv").config({ path: ".env.migration" });

if (!process.env.ATLAS_APP_URI) {
  throw new Error("ATLAS_APP_URI is missing");
}

process.env.MONGO_URI = process.env.ATLAS_APP_URI;

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const dbConnect = require("../config/db.connect");
const Admin = require("../models/admin.model");

async function seedAdmin() {
  await dbConnect();

  const existingAdmin = await Admin.findOne({ username: "admin" });

  if (existingAdmin) {
    console.log("Admin already exists. Skipping creation.");
    await mongoose.disconnect();
    return;
  }

  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

  await Admin.create({
    username: "admin",
    passwordHash: passwordHash,
  });

  console.log("Admin created successfully");

  await mongoose.disconnect();
}

seedAdmin();
