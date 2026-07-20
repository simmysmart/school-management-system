// ===========================================================
// File: classController.js
// Project: School Management System
// Purpose:
// Handles Class CRUD Operations
// ===========================================================

const db = require("../db");

// ===========================================================
// GET ALL CLASSES
// ===========================================================
exports.getClasses = (req, res) => {

    const sql = `
        SELECT
            classes.id,
            classes.class_name,
            classes.created_at,
            teachers.first_name,
            teachers.last_name
        FROM classes
        LEFT JOIN teachers
            ON classes.class_teacher_id = teachers.id
        ORDER BY classes.class_name ASC
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
// ADD NEW CLASS
// ===========================================================
exports.addClass = (req, res) => {

    const {
        class_name,
        class_teacher_id
    } = req.body;

    // Validation
    if (!class_name) {

        return res.status(400).json({
            success: false,
            message: "Class name is required."
        });

    }

    const sql = `
        INSERT INTO classes
        (
            class_name,
            class_teacher_id
        )
        VALUES (?, ?)
    `;

    db.query(

        sql,

        [
            class_name,
            class_teacher_id || null
        ],

        (err) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            res.status(201).json({

                success: true,
                message: "Class added successfully."

            });

        }

    );

};


// ===========================================================
// GET SINGLE CLASS
// ===========================================================
exports.getClassById = (req, res) => {

    const sql = `
        SELECT *
        FROM classes
        WHERE id = ?
    `;

    db.query(

        sql,

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
                    message: "Class not found."

                });

            }

            res.json({

                success: true,
                class: results[0]

            });

        }

    );

};


// ===========================================================
// UPDATE CLASS
// ===========================================================
exports.updateClass = (req, res) => {

    const {
        class_name,
        class_teacher_id
    } = req.body;

    // Validation
    if (!class_name) {

        return res.status(400).json({

            success: false,
            message: "Class name is required."

        });

    }

    const sql = `
        UPDATE classes
        SET
            class_name = ?,
            class_teacher_id = ?
        WHERE id = ?
    `;

    db.query(

        sql,

        [
            class_name,
            class_teacher_id || null,
            req.params.id
        ],

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
                    message: "Class not found."

                });

            }

            res.json({

                success: true,
                message: "Class updated successfully."

            });

        }

    );

};


// ===========================================================
// DELETE CLASS
// ===========================================================
exports.deleteClass = (req, res) => {

    const sql = `
        DELETE FROM classes
        WHERE id = ?
    `;

    db.query(

        sql,

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
                    message: "Class not found."

                });

            }

            res.json({

                success: true,
                message: "Class deleted successfully."

            });

        }

    );

};