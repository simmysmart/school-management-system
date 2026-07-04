const db = require("../db");

// =========================================
// Get Dashboard Stats
// =========================================

exports.getStats = (req, res) => {

    const stats = {};

    // Count Students
    db.query("SELECT COUNT(*) AS totalStudents FROM students", (err, studentResult) => {

        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }

        stats.students = studentResult[0].totalStudents;

        // Count Teachers
        db.query("SELECT COUNT(*) AS totalTeachers FROM teachers", (err, teacherResult) => {

            if (err) {
                return res.status(500).json({ success: false, message: err.message });
            }

            stats.teachers = teacherResult[0].totalTeachers;

            // Count Classes
            db.query("SELECT COUNT(*) AS totalClasses FROM classes", (err, classResult) => {

                if (err) {
                    return res.status(500).json({ success: false, message: err.message });
                }

                stats.classes = classResult[0].totalClasses;

                res.json({
                    success: true,
                    stats
                });

            });

        });

    });

};