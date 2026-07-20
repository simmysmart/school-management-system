// ===========================================================
// File: backend/middleware/authMiddleware.js
// Project: School Management System
// Purpose:
// Protect routes by verifying JWT token.
// ===========================================================

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    console.log("==================================");
    console.log("Request URL:", req.originalUrl);
    console.log("Request Method:", req.method);
    console.log("Authorization Header:", req.headers.authorization);
    console.log("Headers:", req.headers);
    console.log("==================================");

    // ==========================================
    // Get Authorization Header
    // ==========================================

    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({

            success: false,
            message: "Access denied. No token provided."

        });

    }

    // ==========================================
    // Validate Bearer Format
    // ==========================================

    if (!authHeader.startsWith("Bearer ")) {

        return res.status(401).json({

            success: false,
            message: "Invalid authorization format."

        });

    }

    // ==========================================
    // Extract Token
    // ==========================================

    const token = authHeader.split(" ")[1];

    if (!token) {

        return res.status(401).json({

            success: false,
            message: "Token missing."

        });

    }

    // ==========================================
    // Verify Token
    // ==========================================

    try {

        const decoded = jwt.verify(

            token,
            process.env.JWT_SECRET || "myschoolsecretkey"

        );

        req.user = decoded;

        next();

    } catch (err) {

        console.error("JWT Error:", err.message);

        return res.status(401).json({

            success: false,
            message: "Invalid or expired token."

        });

    }

};

module.exports = authMiddleware;