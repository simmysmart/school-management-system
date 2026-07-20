// ===========================================================
// File: attendanceController.js
// Project: School Management System
// ===========================================================

const db = require("../db");

// ===========================================================
// GET ALL ATTENDANCE
// ===========================================================

exports.getAttendance = (req, res) => {

    const sql = `
        SELECT
            attendance.id,
            attendance.student_id,
            attendance.attendance_date,
            attendance.status,
            attendance.remarks,
            students.first_name,
            students.last_name,
            students.admission_number
        FROM attendance
        INNER JOIN students
            ON attendance.student_id = students.id
        ORDER BY attendance.attendance_date DESC
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
// GET SINGLE ATTENDANCE
// ===========================================================

exports.getAttendanceById = (req, res) => {

    db.query(
        "SELECT * FROM attendance WHERE id = ?",
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
                    message: "Attendance record not found."
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
// ADD ATTENDANCE
// ===========================================================

exports.addAttendance = (req, res) => {

    const {
        student_id,
        attendance_date,
        status,
        remarks
    } = req.body;

    const sql = `
        INSERT INTO attendance
        (
            student_id,
            attendance_date,
            status,
            remarks
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            student_id,
            attendance_date,
            status,
            remarks
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(201).json({
                success: true,
                message: "Attendance added successfully.",
                id: result.insertId
            });

        }
    );

};

// ===========================================================
// UPDATE ATTENDANCE
// ===========================================================

exports.updateAttendance = (req, res) => {

    const {
        student_id,
        attendance_date,
        status,
        remarks
    } = req.body;

    const sql = `
        UPDATE attendance
        SET
            student_id = ?,
            attendance_date = ?,
            status = ?,
            remarks = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            student_id,
            attendance_date,
            status,
            remarks,
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
                    message: "Attendance record not found."
                });
            }

            res.json({
                success: true,
                message: "Attendance updated successfully."
            });

        }
    );

};

// ===========================================================
// DELETE ATTENDANCE
// ===========================================================

exports.deleteAttendance = (req, res) => {

    db.query(
        "DELETE FROM attendance WHERE id = ?",
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
                    message: "Attendance record not found."
                });
            }

            res.json({
                success: true,
                message: "Attendance deleted successfully."
            });

        }
    );

};