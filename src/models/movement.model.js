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
  movementSummary: { type: String, required: true },
  movementDescription: { type: String, required: true },
  movementExecution: { type: String, required: true, enum: ["static", "dynamic"] },
  movementDemand: { type: [String], required: true, enum: ["strength", "power", "balance", "coordination", "precision"] },
  movementTerrain: { type: [String], required: true, enum: ["slab", "vertical", "overhang", "roof", "dihedral", "arete"] },
  movementStatus: { type: String, required: true, enum: ["draft", "needs-review", "published"] },
  movementWhenToUse: { type: String, required: true },
  movementHowToPerform: { type: String, required: true },
  movementCommonMistakes: { type: String, required: true },
  movementTags: { type: [String], required: true },
  movementResearchNotes: { type: String, required: false },
  movementExtraNotes: { type: String, required: false },
  exampleImages: { type: [exampleImageSchema], required: false },
});

const Movement = model("movement", movementSchema);

module.exports = Movement;



