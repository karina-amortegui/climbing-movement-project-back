import { Request, Response } from "express";
import { z } from "zod";

const Movement = require("../models/movement.model.js");

const exampleImageSchema = z.object({
  url: z.string().min(1),
  altText: z.string().min(1),
  creator: z.string().min(1),
  source: z.string().min(1),
  sourceUrl: z.string().min(1),
  license: z.string().min(1),
  licenseUrl: z.string().min(1),
  caption: z.string().optional(),
  order: z.number(),
});

const movementBaseSchema = z.object({
  movementName: z.string().min(1),
  movementSummary: z.string(),
  movementDescription: z.string(),
  movementWhenToUse: z.string(),
  movementHowToPerform: z.string(),
  movementCommonMistakes: z.string(),
  movementExecution: z.enum(["static", "dynamic", ""]),
  movementDemand: z.array(
    z.enum(["strength", "power", "balance", "coordination", "precision"]),
  ),
  movementTerrain: z.array(
    z.enum(["slab", "vertical", "overhang", "roof", "dihedral", "arete"]),
  ),
  movementStatus: z.enum(["draft", "needs-review", "published"]),
  movementTags: z.array(z.string()),
  movementResearchNotes: z.string().optional(),
  movementExtraNotes: z.string().optional(),
  exampleImages: z.array(exampleImageSchema).optional(),
});

const createMovementSchema = movementBaseSchema.refine(
  (movement) => {
    if (movement.movementStatus !== "published") {
      return true;
    }

    const requiredTextFields = [
      movement.movementName,
      movement.movementSummary,
      movement.movementDescription,
      movement.movementWhenToUse,
      movement.movementHowToPerform,
      movement.movementCommonMistakes,
    ];

    return (
      requiredTextFields.every(
        (value) =>
          value.trim().length > 0 && value.trim().toUpperCase() !== "UNKNOWN",
      ) &&
      movement.movementExecution !== "" &&
      movement.movementDemand.length > 0 &&
      movement.movementTerrain.length > 0 &&
      movement.movementTags.every(
        (tag) => tag.trim().toUpperCase() !== "UNKNOWN",
      )
    );
  },
  {
    message: "Published movements must have complete information.",
  },
);

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
};

async function createMovement(req: Request, res: Response) {
  const validation = createMovementSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      message: "Invalid movement data",
      errors: validation.error.issues,
    });
  }

  const validatedData = validation.data;

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
  } = validatedData;

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
  const movementsFromDB = await Movement.find({
    movementStatus: "published",
  });
  res.status(200).json({
    message: "Movements fetched successfully",
    data: movementsFromDB,
    total: movementsFromDB.length,
  });
}

async function getAllMovements(req: Request, res: Response) {
  const movementsFromDB = await Movement.find();

  res.status(200).json({
    message: "All movements fetched successfully",
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
        message: "The requested movement doesn't exist",
      });
    }
    res.status(200).json({
      message: "Movement successfully retrieved",
      data: movementFromDB,
    });
  } catch (err) {
    res.status(400).json({
      message: "Invalid movement ID",
    });
  }
}

async function updateMovementById(req: Request, res: Response) {
  const { id } = req.params;
  const validation = movementBaseSchema.partial().safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      message: "Invalid movement data",
      errors: validation.error.issues,
    });
  }

  const updates = validation.data;

  try {
    const existingMovement = await Movement.findById(id);

    if (!existingMovement) {
      return res.status(404).json({
        message: "Movement not found",
      });
    }

    const mergedMovement = {
      ...existingMovement.toObject(),
      ...updates,
    };

    const completeValidation = createMovementSchema.safeParse(mergedMovement);

    if (!completeValidation.success) {
      return res.status(400).json({
        message: "Invalid movement data",
        errors: completeValidation.error.issues,
      });
    }

    const movementFromDB = await Movement.findByIdAndUpdate(id, updates, {
      returnDocument: "after",
      runValidators: true,
    });
    if (movementFromDB === null) {
      return res.status(404).json({
        message: "Valid ID but movement does not exist",
      });
    }
    res.status(200).json({
      message: "Movement successfully updated",
      data: movementFromDB,
    });
  } catch (err) {
    if (!(err instanceof Error)) {
      return res.status(500).json({
        message: "Unexpected server error",
      });
    }
    if (err.name === "CastError") {
      res.status(400).json({
        message: "Invalid movement ID",
      });
    } else if (err.name === "ValidationError") {
      res.status(400).json({
        message: "Invalid movement data",
      });
    }

    console.log("Unexpecred movement update error:", err);

    return res.status(500).json({
      message: "Unexpected server error",
    });
  }
}

async function deleteMovementById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const movementFromDB = await Movement.findByIdAndDelete(id);
    if (movementFromDB === null) {
      return res.status(404).json({
        message: "Valid ID but movement does not exist",
      });
    }
    res.status(200).json({
      message: "Movement permanently deleted",
      data: movementFromDB,
    });
  } catch (err) {
    res.status(400).json({
      message: "Unable to delete movement",
    });
  }
}

async function setFeatured(req: Request, res: Response) {
  const { id } = req.params;

  const movement = await Movement.findById(id);

  if (!movement) {
    return res.status(404).json({
      message: "Movement not found",
    });
  }

  const featuredPrev = await Movement.updateMany(
    { isFeatured: true },
    { $set: { isFeatured: false } },
  );
  const featured = await Movement.findByIdAndUpdate(
    id,
    { $set: { isFeatured: true } },
    { new: true },
  );

  res.status(200).json({ featured: featured });
}

async function getFeatured(req: Request, res: Response) {
  const featured = await Movement.findOne({ isFeatured: true });
  if (!featured) {
    return res.status(404).json({
      featured: null,
    });
  }
  res.status(200).json({
    featured: featured,
  });
}

// makes functions available to other files to import
export {
  createMovement,
  getMovements,
  getAllMovements,
  getMovementById,
  updateMovementById,
  deleteMovementById,
  setFeatured,
  getFeatured,
};
