// ===========================================================
// File: resultController.js
// Project: School Management System
// Purpose:
// Handles all Result CRUD operations.
// ===========================================================

const db = require("../db");

// ===========================================================
// GET ALL RESULTS
// ===========================================================
exports.getResults = async (req, res) => {

    try {

        const [rows] = await db.query(`
            SELECT
                r.*,
                s.first_name,
                s.last_name,
                s.admission_number,
                sub.subject_name
            FROM results r
            JOIN students s
                ON r.student_id = s.id
            JOIN subjects sub
                ON r.subject_id = sub.id
            ORDER BY r.id DESC
        `);

        res.json({
            success: true,
            data: rows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ===========================================================
// GET SINGLE RESULT
// ===========================================================
exports.getResult = async (req, res) => {

    try {

        const [rows] = await db.query(

            "SELECT * FROM results WHERE id = ?",

            [req.params.id]

        );

        if (rows.length === 0) {

            return res.status(404).json({

                success: false,

                message: "Result not found."

            });

        }

        res.json({

            success: true,

            data: rows[0]

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ===========================================================
// ADD RESULT
// ===========================================================
exports.addResult = async (req, res) => {

    try {

        const {

            student_id,
            subject_id,
            term,
            session,
            ca_score,
            exam_score

        } = req.body;

        // ===========================
        // Validation
        // ===========================

        if (
            !student_id ||
            !subject_id ||
            !term ||
            !session ||
            ca_score === undefined ||
            exam_score === undefined
        ) {

            return res.status(400).json({

                success: false,

                message: "All fields are required."

            });

        }

        if (Number(ca_score) < 0 || Number(ca_score) > 30) {

            return res.status(400).json({

                success: false,

                message: "CA score must be between 0 and 30."

            });

        }

        if (Number(exam_score) < 0 || Number(exam_score) > 70) {

            return res.status(400).json({

                success: false,

                message: "Exam score must be between 0 and 70."

            });

        }

        // ===========================
        // Check Student
        // ===========================

        const [student] = await db.query(

            "SELECT id FROM students WHERE id = ?",

            [student_id]

        );

        if (student.length === 0) {

            return res.status(404).json({

                success: false,

                message: "Student not found."

            });

        }

        // ===========================
        // Check Subject
        // ===========================

        const [subject] = await db.query(

            "SELECT id FROM subjects WHERE id = ?",

            [subject_id]

        );

        if (subject.length === 0) {

            return res.status(404).json({

                success: false,

                message: "Subject not found."

            });

        }

        // ===========================
        // Duplicate Check
        // ===========================

        const [existing] = await db.query(

            `SELECT id
             FROM results
             WHERE student_id = ?
             AND subject_id = ?
             AND term = ?
             AND session = ?`,

            [

                student_id,
                subject_id,
                term,
                session

            ]

        );

        if (existing.length > 0) {

            return res.status(400).json({

                success: false,

                message: "Result already exists for this student."

            });

        }

        const total = Number(ca_score) + Number(exam_score);

        let grade = "";
        let remark = "";

        if (total >= 70) {

            grade = "A";
            remark = "Excellent";

        } else if (total >= 60) {

            grade = "B";
            remark = "Very Good";

        } else if (total >= 50) {

            grade = "C";
            remark = "Good";

        } else if (total >= 45) {

            grade = "D";
            remark = "Fair";

        } else if (total >= 40) {

            grade = "E";
            remark = "Pass";

        } else {

            grade = "F";
            remark = "Fail";

        }

        await db.query(

            `INSERT INTO results
            (
                student_id,
                subject_id,
                term,
                session,
                ca_score,
                exam_score,
                total,
                grade,
                remark
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,

            [

                student_id,
                subject_id,
                term,
                session,
                ca_score,
                exam_score,
                total,
                grade,
                remark

            ]

        );

        res.json({

            success: true,

            message: "Result added successfully."

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ===========================================================
// UPDATE RESULT
// ===========================================================
exports.updateResult = async (req, res) => {

    try {

        const {

            student_id,
            subject_id,
            term,
            session,
            ca_score,
            exam_score

        } = req.body;

        if (
            !student_id ||
            !subject_id ||
            !term ||
            !session ||
            ca_score === undefined ||
            exam_score === undefined
        ) {

            return res.status(400).json({

                success: false,

                message: "All fields are required."

            });

        }

        if (Number(ca_score) < 0 || Number(ca_score) > 30) {

            return res.status(400).json({

                success: false,

                message: "CA score must be between 0 and 30."

            });

        }

        if (Number(exam_score) < 0 || Number(exam_score) > 70) {

            return res.status(400).json({

                success: false,

                message: "Exam score must be between 0 and 70."

            });

        }

        const [duplicate] = await db.query(

            `SELECT id
             FROM results
             WHERE student_id = ?
             AND subject_id = ?
             AND term = ?
             AND session = ?
             AND id <> ?`,

            [

                student_id,
                subject_id,
                term,
                session,
                req.params.id

            ]

        );

        if (duplicate.length > 0) {

            return res.status(400).json({

                success: false,

                message: "Result already exists for this student."

            });

        }

        const total = Number(ca_score) + Number(exam_score);

        let grade = "";
        let remark = "";

        if (total >= 70) {

            grade = "A";
            remark = "Excellent";

        } else if (total >= 60) {

            grade = "B";
            remark = "Very Good";

        } else if (total >= 50) {

            grade = "C";
            remark = "Good";

        } else if (total >= 45) {

            grade = "D";
            remark = "Fair";

        } else if (total >= 40) {

            grade = "E";
            remark = "Pass";

        } else {

            grade = "F";
            remark = "Fail";

        }

        await db.query(

            `UPDATE results
             SET
                student_id = ?,
                subject_id = ?,
                term = ?,
                session = ?,
                ca_score = ?,
                exam_score = ?,
                total = ?,
                grade = ?,
                remark = ?
             WHERE id = ?`,

            [

                student_id,
                subject_id,
                term,
                session,
                ca_score,
                exam_score,
                total,
                grade,
                remark,
                req.params.id

            ]

        );

        res.json({

            success: true,

            message: "Result updated successfully."

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ===========================================================
// DELETE RESULT
// ===========================================================
exports.deleteResult = async (req, res) => {

    try {

        await db.query(

            "DELETE FROM results WHERE id = ?",

            [req.params.id]

        );

        res.json({

            success: true,

            message: "Result deleted successfully."

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};