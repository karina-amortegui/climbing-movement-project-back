const { Schema, Model, model, Document } = require("mongoose");

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
});

const Movement = model("movement", movementSchema);

module.exports = Movement;



