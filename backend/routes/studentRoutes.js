// ===========================================================
// File: studentRoutes.js
// Project: School Management System
// Purpose:
// Handles all student-related routes.
// ===========================================================

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    addStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");

// ===========================================================
// ADD STUDENT
// POST /api/students/add
// ===========================================================
router.post("/add", authMiddleware, addStudent);

// ===========================================================
// GET ALL STUDENTS
// GET /api/students
// ===========================================================
router.get("/", authMiddleware, getStudents);

// ===========================================================
// GET SINGLE STUDENT
// GET /api/students/:id
// ===========================================================
router.get("/:id", authMiddleware, getStudentById);

// ===========================================================
// UPDATE STUDENT
// PUT /api/students/:id
// ===========================================================
router.put("/:id", authMiddleware, updateStudent);

// ===========================================================
// DELETE STUDENT
// DELETE /api/students/:id
// ===========================================================
router.delete("/:id", authMiddleware, deleteStudent);

module.exports = router;