const db = require("../db");

// =========================================
// Get All Classes
// =========================================
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

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            data: result
        });

    });

};

// =========================================
// Add New Class
// =========================================
exports.addClass = (req, res) => {

    const { class_name, class_teacher_id } = req.body;

    if (!class_name) {
        return res.status(400).json({
            success: false,
            message: "Class name is required."
        });
    }

    const sql = `
        INSERT INTO classes
        (class_name, class_teacher_id)
        VALUES (?, ?)
    `;

    db.query(sql, [class_name, class_teacher_id || null], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Class added successfully."
        });

    });

};

// =========================================
// Get Single Class
// =========================================
exports.getClassById = (req, res) => {

    const sql = "SELECT * FROM classes WHERE id = ?";

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Class not found."
            });
        }

        res.json({
            success: true,
            class: result[0]
        });

    });

};

// =========================================
// Update Class
// =========================================
exports.updateClass = (req, res) => {

    const { class_name, class_teacher_id } = req.body;

    const sql = `
        UPDATE classes
        SET
            class_name = ?,
            class_teacher_id = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [class_name, class_teacher_id || null, req.params.id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                message: "Class updated successfully."
            });

        }
    );

};

// =========================================
// Delete Class
// =========================================
exports.deleteClass = (req, res) => {

    const sql = "DELETE FROM classes WHERE id = ?";

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Class deleted successfully."
        });

    });

};