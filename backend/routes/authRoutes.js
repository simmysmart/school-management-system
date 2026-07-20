// ==========================================================
// File: authRoutes.js
// Project: School Management System
// ==========================================================

const express = require("express");
const router = express.Router();

const {
    registerAdmin,
    loginAdmin
} = require("../controllers/authController");

const loginLimiter = require("../middleware/loginLimiter");

const {
    loginValidator
} = require("../validators/authValidator");

// ==========================================
// Register Admin
// ==========================================

router.post(
    "/register",
    registerAdmin
);

// ==========================================
// Login Admin
// ==========================================
router.post("/login", loginAdmin);
module.exports = router;