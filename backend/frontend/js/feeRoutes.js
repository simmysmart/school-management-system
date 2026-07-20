const express = require("express");
const router = express.Router();

const feeController = require("../controllers/feeController");

// Get all fees
router.get("/", feeController.getFees);

// Add fee
router.post("/", feeController.addFee);

// Get single fee
router.get("/:id", feeController.getFeeById);

// Update fee
router.put("/:id", feeController.updateFee);

// Delete fee
router.delete("/:id", feeController.deleteFee);

module.exports = router;