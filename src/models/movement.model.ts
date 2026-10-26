const { Schema, Model, model, Document } = require("mongoose");

const exampleImageSchema = new Schema({
  url: { type: String, required: true },
  altText: { type: String, required: true },
  creator: { type: String, required: true },
  source: { type: String, required: true },
  sourceUrl: { type: String, required: true },
  license: { type: String, required: true },
  licenseUrl: { type: String, required: true },
  caption: { type: String, required: false },
  order: { type: Number, required: true },
});

const movementSchema = new Schema({
  movementName: { type: String, required: true, unique: true },
  movementSummary: { type: String, required: false },
  movementDescription: { type: String, required: false },
  movementExecution: {
    type: String,
    required: false,
    enum: ["static", "dynamic", ""],
  },
  movementDemand: {
    type: [String],
    required: false,
    enum: ["strength", "power", "balance", "coordination", "precision"],
  },
  movementTerrain: {
    type: [String],
    required: false,
    enum: ["slab", "vertical", "overhang", "roof", "dihedral", "arete"],
  },
  movementStatus: {
    type: String,
    required: true,
    enum: ["draft", "needs-review", "published"],
  },
  movementWhenToUse: { type: String, required: false },
  movementHowToPerform: { type: String, required: false },
  movementCommonMistakes: { type: String, required: false },
  movementTags: { type: [String], required: false },
  movementResearchNotes: { type: String, required: false },
  movementExtraNotes: { type: String, required: false },
  exampleImages: { type: [exampleImageSchema], required: false },
  isFeatured: { type: Boolean, default: false },
});

const Movement = model("movement", movementSchema);

module.exports = Movement;
