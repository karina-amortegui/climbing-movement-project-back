const { Schema, Model, model, Document } = require("mongoose");

const movementSchema = new Schema({
  movementName: { type: String, required: true, unique: true },
  movementSummary: { type: String, required: true },
  movementDescription: { type: String, required: true },
  movementExecution: { type: String, required: true, enum: ["Static", "Dynamic"] },
  movementDemand: { type: [String], required: true, enum: ["Strenght", "Power", "Balance", "Coordination", "Precision"] },
  movementTerrain: { type: [String], required: true, enum: ["Slab", "Vertical", "Overhang", "Roof", "Dihedral", "Arete"] },
  movementStatus: { type: String, required: true, enum: ["Draft", "Needs Preview", "Published"] },
  movementWhenToUse: { type: String, required: true },
  movementHowToPerform: { type: String, required: true },
  movementCommonMistakes: { type: String, required: true },
  movementTags: { type: [String], required: true },
  movementResearchNotes: { type: String, required: false },
  movementExtraNotes: { type: String, required: false },
});

const Movement = model("movement", movementSchema);

module.exports = Movement;



