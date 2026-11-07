const express = require("express");

const {
  createMovement,
  getMovements,
  getAllMovements,
  getMovementById,
  updateMovementById,
  deleteMovementById,
  setFeatured,
  getFeatured,
  searchMovements,
} = require("../controllers/movement.controller");

const requireAuth = require("../middleware/auth.middleware");

const router = express.Router();

// router.route("/")
//   .post(requireAuth, createMovement)
//   .get(getMovements)

router.post("/", requireAuth, createMovement);
router.get("/", getMovements);
router.get(
  "/admin/all",
  // requireAuth,
  getAllMovements,
);
router.get("/search", searchMovements);

router.patch("/set-featured/:id", requireAuth, setFeatured);
router.get("/get-featured", getFeatured);
router.get("/:id", getMovementById);
router.patch("/:id", requireAuth, updateMovementById);
router.delete("/:id", requireAuth, deleteMovementById);

module.exports = router;
