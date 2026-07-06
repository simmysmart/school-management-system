const express = require("express");
const router = express.Router();

const classController = require("../controllers/classController");

// Get all classes
router.get("/", classController.getClasses);

// Get single class
router.get("/:id", classController.getClassById);

// Add class
router.post("/", classController.addClass);

// Update class
router.put("/:id", classController.updateClass);

// Delete class
router.delete("/:id", classController.deleteClass);

module.exports = router;