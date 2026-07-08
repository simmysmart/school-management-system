const express = require("express");
const router = express.Router();

const subjectController = require("../controllers/subjectController");

// =========================================
// Get All Subjects
// =========================================
router.get("/", subjectController.getSubjects);

// =========================================
// Add Subject
// =========================================
router.post("/", subjectController.addSubject);

// =========================================
// Get Single Subject
// =========================================
router.get("/:id", subjectController.getSubjectById);

// =========================================
// Update Subject
// =========================================
router.put("/:id", subjectController.updateSubject);

// =========================================
// Delete Subject
// =========================================
router.delete("/:id", subjectController.deleteSubject);

module.exports = router;