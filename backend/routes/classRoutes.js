// ===========================================================
// File: classRoutes.js
// ===========================================================

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const classController = require("../controllers/classController");

router.get("/", authMiddleware, classController.getClasses);

router.get("/:id", authMiddleware, classController.getClassById);

router.post("/", authMiddleware, classController.addClass);

router.put("/:id", authMiddleware, classController.updateClass);

router.delete("/:id", authMiddleware, classController.deleteClass);

module.exports = router;