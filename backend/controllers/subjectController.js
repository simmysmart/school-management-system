const db = require("../db");

// =========================================
// Get All Subjects
// =========================================
exports.getSubjects = (req, res) => {

    const sql = `
        SELECT
            subjects.id,
            subjects.subject_name,
            subjects.subject_code,
            subjects.created_at,
            classes.class_name,
            teachers.first_name,
            teachers.last_name
        FROM subjects
        LEFT JOIN classes
            ON subjects.class_id = classes.id
        LEFT JOIN teachers
            ON subjects.teacher_id = teachers.id
        ORDER BY subjects.subject_name ASC
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

// =========================================
// Add Subject
// =========================================
exports.addSubject = (req, res) => {

   const {
    subject_name,
    subject_code,
    class_id,
    teacher_id
} = req.body;

if (!subject_name || !subject_code || !class_id) {

    return res.status(400).json({

        success: false,

        message: "Subject name, code and class are required."

    });

}
    const sql = `
        INSERT INTO subjects
        (subject_name, subject_code, class_id, teacher_id)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            subject_name,
            subject_code,
            class_id,
            teacher_id || null
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
                message: "Subject added successfully."
            });

        }
    );

};

// =========================================
// Get One Subject
// =========================================
exports.getSubjectById = (req, res) => {

    db.query(
        "SELECT * FROM subjects WHERE id = ?",
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
                    message: "Subject not found."
                });

            }

            res.json({
                success: true,
                subject: results[0]
            });

        }
    );

};


// =========================================
// =========================================
// Update Subject
// =========================================
exports.updateSubject = (req, res) => {

    const {
        subject_name,
        subject_code,
        class_id,
        teacher_id
    } = req.body;

    // =========================================
    // Validation
    // =========================================
    if (!subject_name || !subject_code || !class_id) {

        return res.status(400).json({

            success: false,

            message: "Subject name, code and class are required."

        });

    }

    const sql = `
        UPDATE subjects
        SET
            subject_name = ?,
            subject_code = ?,
            class_id = ?,
            teacher_id = ?
        WHERE id = ?
    `;

    db.query(

        sql,

        [
            subject_name,
            subject_code,
            class_id,
            teacher_id || null,
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

                message: "Subject updated successfully."

            });

        }

    );

};
// =========================================
// Delete Subject
// =========================================
exports.deleteSubject = (req, res) => {

    db.query(
        "DELETE FROM subjects WHERE id = ?",
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
                message: "Subject deleted successfully."
            });

        }
    );

};