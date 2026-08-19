const { Schema, Model, model, Document } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }, // adds createdAt and updatedAt automatically
);

const User = model("user", userSchema);

module.exports = User;
