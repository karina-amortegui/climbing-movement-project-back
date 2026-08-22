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
    message: "Movement created successfully",
    data: newMovement,
  });
}

async function getMovements(req, res) {
  const movementsFromDB = await Movement.find();
  res.status(200).json({
    message: "Movements fetched successfully",
    data: movementsFromDB,
    total: movementsFromDB.length,
  });
}

async function getMovementById(req, res) {
  const { id } = req.params;

  try {
    const movementFromDB = await Movement.findById(id);
    if (movementFromDB === null) {
    return res.status(404).json({
      message: "The requested movement doesn't exist"
    });
  }
    res.status(200).json({
      message: "Movement successfully retrieved",
      data: movementFromDB,
    });
  }
  catch (err) {
    res.status(400).json({
      message: "Invalid movement ID"
    });
  }
}

async function updateMovementById(req, res) {
  const { id } = req.params;
  const updates = req.body;
  
  try {
    const movementFromDB = await Movement.findByIdAndUpdate
    (
      id, updates, { returnDocument: "after", runValidators: true }
    );
    if (movementFromDB === null) {
    return res.status(404).json({
      message: "Valid ID but movement does not exist"
    });
  }
    res.status(200).json({
      message: "Movement successfully updated",
      data: movementFromDB,
    });
  }
  catch (err) {
    if (err.name === "CastError") {
    res.status(400).json({
      message: "Invalid movement ID"
    });
  } else if (err.name === "ValidationError") {
    res.status(400).json({
      message: "Invalid movement data"
    });
  }
  }
}

async function deleteMovementById(req, res) {
  const { id } = req.params;

  try {
    const movementFromDB = await Movement.findByIdAndDelete(id);
     if (movementFromDB === null) {
    return res.status(404).json({
      message: "Valid ID but movement does not exist"
    });
  }
    res.status(200).json({
      message: "Movement permanently deleted",
      data: movementFromDB,
    });
  }
  catch (err) {
    res.status(400).json({
      message: "Unable to delete movement"
    });
  }
}

// makes functions available to other files to import
module.exports = {
  createMovement,
  getMovements,
  getMovementById,
  updateMovementById,
  deleteMovementById,
};