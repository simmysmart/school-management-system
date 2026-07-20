// ===========================================================
// File: teacherRoutes.js
// ===========================================================

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    addTeacher,
    getTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
} = require("../controllers/teacherController");

router.post("/add", authMiddleware, addTeacher);

router.get("/", authMiddleware, getTeachers);

router.get("/:id", authMiddleware, getTeacherById);

router.put("/:id", authMiddleware, updateTeacher);

router.delete("/:id", authMiddleware, deleteTeacher);

module.exports = router;