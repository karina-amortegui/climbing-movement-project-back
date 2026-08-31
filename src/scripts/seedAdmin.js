require("dotenv").config();

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const dbConnect = require("../config/db.connect");
const Admin = require("../models/admin.model");

async function seedAdmin() {
  await dbConnect();
  
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10); 

  await Admin.create({
    username: "admin",
    passwordHash: passwordHash,
  });

  console.log("Admin created successfully");

  await mongoose.disconnect();
}

 seedAdmin();