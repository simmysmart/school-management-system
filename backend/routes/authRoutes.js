const express = require("express");
const router = express.Router();

const {
    registerAdmin,
    loginAdmin
} = require("../controllers/authController");

// Import validation middleware
const {
    registerValidation,
    validate
} = require("../validators/authValidator");

// ===========================
// Admin Registration Route
// ===========================
router.post(
    "/register",
    registerValidation,
    validate,
    registerAdmin
);

// ===========================
// Admin Login Route
// ===========================
router.post(
    "/login",
    loginAdmin
);

module.exports = router;