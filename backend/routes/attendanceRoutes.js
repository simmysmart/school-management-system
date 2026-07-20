// ===========================================================
// File: attendanceRoutes.js
// Project: School Management System
// ===========================================================

const express = require("express");

const router = express.Router();

const attendanceController = require("../controllers/attendanceController");

const authMiddleware = require("../middleware/authMiddleware");

// ===========================================================
// GET ALL ATTENDANCE
// ===========================================================

router.get(

    "/",

    authMiddleware,

    attendanceController.getAttendance

);

// ===========================================================
// GET SINGLE ATTENDANCE
// ===========================================================

router.get(

    "/:id",

    authMiddleware,

    attendanceController.getAttendanceById

);

// ===========================================================
// ADD ATTENDANCE
// ===========================================================

router.post(

    "/",

    authMiddleware,

    attendanceController.addAttendance

);

// ===========================================================
// UPDATE ATTENDANCE
// ===========================================================

router.put(

    "/:id",

    authMiddleware,

    attendanceController.updateAttendance

);

// ===========================================================
// DELETE ATTENDANCE
// ===========================================================

router.delete(

    "/:id",

    authMiddleware,

    attendanceController.deleteAttendance

);

module.exports = router;