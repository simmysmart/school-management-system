// ===========================================================
// File: authorize.js
// Project: School Management System
// Purpose:
// Role Based Authorization Middleware
// ===========================================================

const authorize = (...allowedRoles) => {

    return (req, res, next) => {

        // ==========================================
        // Check if user exists
        // ==========================================
        if (!req.user) {

            return res.status(401).json({

                success: false,

                message: "Unauthorized."

            });

        }

        // ==========================================
        // Check role
        // ==========================================
        if (!allowedRoles.includes(req.user.role)) {

            return res.status(403).json({

                success: false,

                message: "Access denied."

            });

        }

        next();

    };

};

module.exports = authorize;