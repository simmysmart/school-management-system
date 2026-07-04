// ===========================================================
// File: authController.js
// Project: School Management System
// Purpose:
// Handles administrator registration and login.
// ===========================================================

const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Import Activity Logger
const logActivity = require("../utils/logger");


// ===========================================================
// REGISTER ADMIN
// ===========================================================

exports.registerAdmin = async (req, res) => {

    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Username, email and password are required."
            });
        }

        db.query(
            "SELECT * FROM users WHERE username = ? OR email = ?",
            [username, email],

            async (err, results) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                if (results.length > 0) {
                    return res.status(400).json({
                        success: false,
                        message: "Username or email already exists."
                    });
                }

                const hashedPassword = await bcrypt.hash(password, 10);

                db.query(
                    "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'admin')",
                    [username, email, hashedPassword],

                    (err) => {

                        if (err) {
                            return res.status(500).json({
                                success: false,
                                message: err.message
                            });
                        }

                        return res.status(201).json({
                            success: true,
                            message: "Admin registered successfully."
                        });

                    }

                );

            }

        );

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// ===========================================================
// LOGIN ADMIN
// ===========================================================

exports.loginAdmin = (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Username and password are required."
        });
    }

    db.query(
        "SELECT * FROM users WHERE username = ? AND role = 'admin'",
        [username],

        async (err, results) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (results.length === 0) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid username or password."
                });
            }

            const user = results[0];

            const match = await bcrypt.compare(
                password,
                user.password
            );

            if (!match) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid username or password."
                });
            }

            // Generate JWT Token
            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.username,
                    role: user.role
                },
                process.env.JWT_SECRET || "myschoolsecretkey",
                {
                    expiresIn: "24h"
                }
            );

            // ==========================================
            // Record Login Activity
            // ==========================================
            //logActivity(
             //   user.id,
            //    "Admin logged in",
           //     req.ip
           // );

            return res.json({
                success: true,
                message: "Login successful.",
                token
            });

        }

    );

};