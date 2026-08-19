const express = require("express")
const { createMovement, retrieveMovements } = require("../controllers/movement.controller.js");
const router = express.Router();
// when this router receives a POST request at its root (/), run the createMovement controller function
router.post("/", createMovement);
router.get("/", retrieveMovements);

module.exports = router;