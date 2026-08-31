const express = require("express")

const { 
  createMovement, getMovements, getMovementById, 
  updateMovementById, deleteMovementById,
} = require("../controllers/movement.controller");

const requireAuth = require("../middleware/auth.middleware")

const router = express.Router();
router.post("/", requireAuth, createMovement);
router.get("/", getMovements); 
router.get("/:id", getMovementById); 
router.patch("/:id", requireAuth, updateMovementById);
router.delete("/:id", requireAuth, deleteMovementById);

module.exports = router;