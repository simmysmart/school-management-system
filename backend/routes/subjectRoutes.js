// ===========================================================
// File: subjectRoutes.js
// ===========================================================

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const subjectController = require("../controllers/subjectController");

router.get("/", authMiddleware, subjectController.getSubjects);

router.post("/", authMiddleware, subjectController.addSubject);

router.get("/:id", authMiddleware, subjectController.getSubjectById);

router.put("/:id", authMiddleware, subjectController.updateSubject);

router.delete("/:id", authMiddleware, subjectController.deleteSubject);

module.exports = router;