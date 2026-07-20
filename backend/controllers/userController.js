// ===========================================================
// File: userController.js
// Project: School Management System
// Purpose:
// Handles User CRUD Operations
// ===========================================================
console.log("✅ userController loaded");
const db = require("../db");
const bcrypt = require("bcrypt");

// ===========================================================
// GET ALL USERS
// ===========================================================

exports.getUsers = (req, res) => {

    const sql = `
        SELECT
            id,
            username,
            email,
            role,
            status,
            last_login,
            created_at
        FROM users
        ORDER BY id DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {

            return res.status(500).json({

                success: false,

                message: err.message

            });

        }

        res.json({

            success: true,

            data: results

        });

    });

};

// ===========================================================
// GET SINGLE USER
// ===========================================================

exports.getUserById = (req, res) => {

    db.query(

        `
        SELECT
            id,
            username,
            email,
            role,
            status
        FROM users
        WHERE id = ?
        `,

        [req.params.id],

        (err, results) => {

            if (err) {

                return res.status(500).json({

                    success: false,

                    message: err.message

                });

            }

            if (results.length === 0) {

                return res.status(404).json({

                    success: false,

                    message: "User not found."

                });

            }

            res.json({

                success: true,

                data: results[0]

            });

        }

    );

};

// ===========================================================
// ADD USER
// ===========================================================

exports.addUser = async (req, res) => {

    try {

        const {

            username,
            email,
            password,
            role,
            status

        } = req.body;

        if (

            !username ||
            !email ||
            !password ||
            !role

        ) {

            return res.status(400).json({

                success: false,

                message: "All fields are required."

            });

        }

        db.query(

            "SELECT id FROM users WHERE username=? OR email=?",

            [

                username,
                email

            ],

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

                    `
                    INSERT INTO users
                    (
                        username,
                        email,
                        password,
                        role,
                        status
                    )
                    VALUES (?, ?, ?, ?, ?)
                    `,

                    [

                        username,
                        email,
                        hashedPassword,
                        role,
                        status || "active"

                    ],

                    (err, result) => {

                        if (err) {

                            return res.status(500).json({

                                success: false,

                                message: err.message

                            });

                        }

                        res.json({

                            success: true,

                            message: "User created successfully.",

                            id: result.insertId

                        });

                    }

                );

            }

        );

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ===========================================================
// UPDATE USER
// ===========================================================

exports.updateUser = (req, res) => {

    const {

        username,
        email,
        role,
        status

    } = req.body;

    db.query(

        `
        UPDATE users
        SET

            username=?,

            email=?,

            role=?,

            status=?

        WHERE id=?
        `,

        [

            username,
            email,
            role,
            status,
            req.params.id

        ],

        (err) => {

            if (err) {

                return res.status(500).json({

                    success: false,

                    message: err.message

                });

            }

            res.json({

                success: true,

                message: "User updated successfully."

            });

        }

    );

};

// ===========================================================
// DELETE USER
// ===========================================================

exports.deleteUser = (req, res) => {

    db.query(

        "DELETE FROM users WHERE id=?",

        [req.params.id],

        (err) => {

            if (err) {

                return res.status(500).json({

                    success: false,

                    message: err.message

                });

            }

            res.json({

                success: true,

                message: "User deleted successfully."

            });

        }

    );

};
console.log(module.exports);