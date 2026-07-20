// ===========================================================
// File: teacherController.js
// Project: School Management System
// Purpose:
// Handles Teacher CRUD operations
// ===========================================================

const db = require("../db");

// ===========================================================
// ADD TEACHER
// ===========================================================

exports.addTeacher = (req, res) => {

    const {

        staff_id,
        first_name,
        last_name,
        gender,
        phone,
        email,
        address,
        qualification

    } = req.body;

    // =========================================
    // Validation
    // =========================================

    if (
        !staff_id ||
        !first_name ||
        !last_name ||
        !gender
    ) {

        return res.status(400).json({

            success: false,

            message: "Staff ID, First Name, Last Name and Gender are required."

        });

    }

    const sql = `
        INSERT INTO teachers
        (
            staff_id,
            first_name,
            last_name,
            gender,
            phone,
            email,
            address,
            qualification
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(

        sql,

        [
            staff_id,
            first_name,
            last_name,
            gender,
            phone || null,
            email || null,
            address || null,
            qualification || null
        ],

        (err) => {

            if (err) {

                if (err.code === "ER_DUP_ENTRY") {

                    return res.status(400).json({

                        success: false,

                        message: "Staff ID already exists."

                    });

                }

                return res.status(500).json({

                    success: false,

                    message: err.message

                });

            }

            res.json({

                success: true,

                message: "Teacher added successfully."

            });

        }

    );

};

// ===========================================================
// GET ALL TEACHERS
// ===========================================================

exports.getTeachers = (req, res) => {

    db.query(

        "SELECT * FROM teachers ORDER BY id DESC",

        (err, results) => {

            if (err) {

                return res.status(500).json({

                    success: false,

                    message: err.message

                });

            }

            res.json({

                success: true,

                teachers: results

            });

        }

    );

};

// ===========================================================
// GET ONE TEACHER
// ===========================================================

exports.getTeacherById = (req, res) => {

    db.query(

        "SELECT * FROM teachers WHERE id = ?",

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

                    message: "Teacher not found."

                });

            }

            res.json({

                success: true,

                teacher: results[0]

            });

        }

    );

};

// ===========================================================
// UPDATE TEACHER
// ===========================================================

exports.updateTeacher = (req, res) => {

    const {

        staff_id,
        first_name,
        last_name,
        gender,
        phone,
        email,
        address,
        qualification

    } = req.body;

    if (
        !staff_id ||
        !first_name ||
        !last_name ||
        !gender
    ) {

        return res.status(400).json({

            success: false,

            message: "Staff ID, First Name, Last Name and Gender are required."

        });

    }

    const sql = `
        UPDATE teachers
        SET
            staff_id = ?,
            first_name = ?,
            last_name = ?,
            gender = ?,
            phone = ?,
            email = ?,
            address = ?,
            qualification = ?
        WHERE id = ?
    `;

    db.query(

        sql,

        [

            staff_id,
            first_name,
            last_name,
            gender,
            phone || null,
            email || null,
            address || null,
            qualification || null,
            req.params.id

        ],

        (err, result) => {

            if (err) {

                if (err.code === "ER_DUP_ENTRY") {

                    return res.status(400).json({

                        success: false,

                        message: "Staff ID already exists."

                    });

                }

                return res.status(500).json({

                    success: false,

                    message: err.message

                });

            }

            if (result.affectedRows === 0) {

                return res.status(404).json({

                    success: false,

                    message: "Teacher not found."

                });

            }

            res.json({

                success: true,

                message: "Teacher updated successfully."

            });

        }

    );

};

// ===========================================================
// DELETE TEACHER
// ===========================================================

exports.deleteTeacher = (req, res) => {

    db.query(

        "DELETE FROM teachers WHERE id = ?",

        [req.params.id],

        (err, result) => {

            if (err) {

                return res.status(500).json({

                    success: false,

                    message: err.message

                });

            }

            if (result.affectedRows === 0) {

                return res.status(404).json({

                    success: false,

                    message: "Teacher not found."

                });

            }

            res.json({

                success: true,

                message: "Teacher deleted successfully."

            });

        }

    );

};