// ===========================================================
// File: dashboardController.js
// Project: School Management System
// Purpose:
// Dashboard Statistics Controller
// ===========================================================

const db = require("../db");

// ===========================================================
// GET DASHBOARD STATISTICS
// GET /api/dashboard/stats
// ===========================================================

exports.getStats = (req, res) => {

    const stats = {};

    // Students
    db.query(
        "SELECT COUNT(*) AS total FROM students",
        (err, students) => {

            if (err)
                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            stats.students = students[0].total;

            // Teachers
            db.query(
                "SELECT COUNT(*) AS total FROM teachers",
                (err, teachers) => {

                    if (err)
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });

                    stats.teachers = teachers[0].total;

                    // Classes
                    db.query(
                        "SELECT COUNT(*) AS total FROM classes",
                        (err, classes) => {

                            if (err)
                                return res.status(500).json({
                                    success: false,
                                    message: err.message
                                });

                            stats.classes = classes[0].total;

                            // Subjects
                            db.query(
                                "SELECT COUNT(*) AS total FROM subjects",
                                (err, subjects) => {

                                    if (err)
                                        return res.status(500).json({
                                            success: false,
                                            message: err.message
                                        });

                                    stats.subjects = subjects[0].total;

                                    // Total Amount Paid
                                    db.query(
                                        `
                                        SELECT
                                        IFNULL(SUM(amount_paid),0)
                                        AS total
                                        FROM payments
                                        `,
                                        (err, payments) => {

                                            if (err)
                                                return res.status(500).json({
                                                    success: false,
                                                    message: err.message
                                                });

                                            stats.payments = payments[0].total;

                                            // Attendance Percentage
                                            db.query(
                                                `
                                                SELECT
                                                ROUND(
                                                (
                                                SUM(status='Present')
                                                /
                                                COUNT(*)
                                                )*100,0
                                                )
                                                AS attendance
                                                FROM attendance
                                                `,
                                                (err, attendance) => {

                                                    if (err) {

                                                        // If attendance table is empty
                                                        stats.attendance = 0;

                                                    } else {

                                                        stats.attendance =
                                                            attendance[0].attendance || 0;

                                                    }

                                                    return res.json({

                                                        success: true,

                                                        stats

                                                    });

                                                }

                                            );

                                        }

                                    );

                                }

                            );

                        }

                    );

                }

            );

        }

    );

};