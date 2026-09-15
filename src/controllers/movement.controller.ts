import { Request, Response } from "express";

const Movement = require("../models/movement.model.js");

type ExampleImage = {
  url: string;
  altText: string;
  creator: string;
  source: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  caption?: string;
  order: number;
};

type CreateMovementType = {
  movementName: string;
  movementSummary: string;
  movementDescription: string;
  movementExecution: string;
  movementDemand: string[];
  movementTerrain: string[];
  movementStatus: string;
  movementWhenToUse: string;
  movementHowToPerform: string;
  movementCommonMistakes: string;
  movementTags: string[];
  movementResearchNotes: string;
  movementExtraNotes: string;
  exampleImages: ExampleImage[];
}

// Zod, Yup

async function createMovement(req: Request, res: Response) {
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
    exampleImages,
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
    exampleImages,
  });

  await newMovement.save();

  res.status(201).json({
    message: "Movement created successfully",
    data: newMovement,
  });
}

async function getMovements(req: Request, res: Response) {
  const movementsFromDB = await Movement.find();
  res.status(200).json({
    message: "Movements fetched successfully",
    data: movementsFromDB,
    total: movementsFromDB.length,
  });
}

async function getMovementById(req: Request, res: Response) {
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

async function updateMovementById(req: Request, res: Response) {
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
    if (!(err instanceof Error)) {
      return res.status(500).json({
        message: "Unexpected server error"
      });
    }
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

async function deleteMovementById(req: Request, res: Response) {
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