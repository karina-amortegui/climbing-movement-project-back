const Movement = require("../models/movement.model.js");

async function createMovement(req, res) {
  const {
    movementName,
    movementSummary,
    movementDescription,
    movementExecution,
    movementDemand,
    movementTerrain,
    movementStatus,
    movementWhenToUse,
    movementHowToPerform,
    movementCommonMistakes,
    movementTags,
    movementResearchNotes,
    movementExtraNotes,
  } = req.body;

  const newMovement = new Movement({
    movementName,
    movementSummary,
    movementDescription,
    movementExecution,
    movementDemand,
    movementTerrain,
    movementStatus,
    movementWhenToUse,
    movementHowToPerform,
    movementCommonMistakes,
    movementTags,
    movementResearchNotes,
    movementExtraNotes,
});

await newMovement.save();

res.status(201).json({
    message: "movement created successfully",
    data: newMovement,
  });
}

async function retrieveMovements(req, res) {
  const movementsFromDB = await Movement.find();
  res.status(200).json({
    message: "movements fetched successfully",
    data: movementsFromDB,
    total: movementsFromDB.length,
  });
}

// makes functions available to other files to import
module.exports = {
  createMovement,
  retrieveMovements,
};