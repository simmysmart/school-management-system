// ===========================================================
// File: dashboardRoutes.js
// Project: School Management System
// Purpose:
// Dashboard Routes
// ===========================================================

const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const dashboardController = require("../controllers/dashboardController");

// ===========================================================
// GET DASHBOARD STATISTICS
// GET /api/dashboard/stats
// ===========================================================

router.get(

    "/stats",

    authMiddleware,

    dashboardController.getStats

);

module.exports = router;