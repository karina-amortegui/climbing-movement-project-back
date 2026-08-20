const express = require("express")
const { 
  createMovement, getMovements, getMovementById, updateMovementById, 
} = require("../controllers/movement.controller.js");
const router = express.Router();
// when this router receives a POST request at its root (/), run the createMovement controller function
router.post("/", createMovement);
router.get("/", getMovements); 
router.get("/:id", getMovementById); 
router.patch("/:id", updateMovementById);

module.exports = router;