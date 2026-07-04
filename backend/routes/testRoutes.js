// =========================================
// Test Protected Routes
// -----------------------------------------
// This file is used to test JWT authentication
// and role-based authorization.
// =========================================

const express = require("express");
const router = express.Router();

// Import authentication middleware
const verifyToken = require("../middleware/authMiddleware");

// Import role authorization middleware
const authorize = require("../middleware/roleMiddleware");

// =========================================
// Admin Dashboard Route
// Only authenticated users with the "admin"
// role can access this route.
// =========================================

router.get(
    "/dashboard",
    verifyToken,          // Verify JWT token
    authorize("admin"),   // Allow only admins

    (req, res) => {

        res.json({
            success: true,
            message: "Welcome Admin!",
            user: req.user
        });

    }
);

// Export the router
module.exports = router;