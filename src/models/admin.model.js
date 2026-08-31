const { Schema, Model, model, Document } = require("mongoose");

const adminSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: "admin" },
  }, 
  {  timestamps: true } // adds createdAt and updatedAt automatically}
);

const Admin = model("Admin", adminSchema);

module.exports = Admin;
