// ===========================================================
// File: backend/controllers/authController.js
// ===========================================================

const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ===========================================================
// REGISTER ADMIN
// ===========================================================

const registerAdmin = (req, res) => {

    console.log("========== REGISTER ==========");

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        });
    }

    db.query(
        "SELECT * FROM users WHERE username = ? OR email = ?",
        [username, email],
        async (err, results) => {

            if (err) {
                console.error("Database Error:", err);
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (results.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "Username or Email already exists."
                });
            }

            try {

                const hashedPassword = await bcrypt.hash(password, 10);

                db.query(
                    "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
                    [
                        username,
                        email,
                        hashedPassword,
                        "admin"
                    ],
                    (err) => {

                        if (err) {
                            console.error(err);
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

            } catch (error) {

                console.error(error);

                return res.status(500).json({
                    success: false,
                    message: error.message
                });

            }

        }
    );

};

// ===========================================================
// LOGIN ADMIN
// ===========================================================

const loginAdmin = (req, res) => {

    console.log("========== LOGIN START ==========");
    console.log("Request Body:", req.body);

    const { username, password } = req.body;

    if (!username || !password) {

        console.log("Username or password missing");

        return res.status(400).json({
            success: false,
            message: "Username and Password are required."
        });

    }

    console.log("Searching database...");

    db.query(
        "SELECT * FROM users WHERE username = ?",
        [username],

        async (err, results) => {

            console.log("Database callback reached");

            if (err) {

                console.error("Database Error:", err);

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            console.log("Database Results:", results);

            if (results.length === 0) {

                console.log("User not found");

                return res.status(401).json({
                    success: false,
                    message: "Invalid Username or Password."
                });

            }

            const user = results[0];

            console.log("User Found:", user.username);

            const match = await bcrypt.compare(
                password,
                user.password
            );

            console.log("Password Match:", match);

            if (!match) {

                return res.status(401).json({
                    success: false,
                    message: "Invalid Username or Password."
                });

            }

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

            console.log("Login Successful");

            return res.json({
                success: true,
                message: "Login Successful.",
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            });

        }

    );

};

// ===========================================================
// EXPORTS
// ===========================================================

module.exports = {
    registerAdmin,
    loginAdmin
};