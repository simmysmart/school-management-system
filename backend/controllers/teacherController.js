const db = require("../db");

// =========================================
// ADD TEACHER
// =========================================
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
    console.log(req.body);

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
            phone,
            email,
            address,
            qualification
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
                message: "Teacher added successfully."
            });

        }
    );

};

// =========================================
// GET ALL TEACHERS
// =========================================
exports.getTeachers = (req, res) => {

    db.query("SELECT * FROM teachers ORDER BY id DESC", (err, results) => {

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

    });

};

// =========================================
// GET ONE TEACHER
// =========================================
exports.getTeacherById = (req, res) => {

    const id = req.params.id;

    db.query("SELECT * FROM teachers WHERE id = ?", [id], (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            teacher: results[0]
        });

    });

};

// =========================================
// UPDATE TEACHER
// =========================================
exports.updateTeacher = (req, res) => {

    const id = req.params.id;

    const { name, email, phone, subject, gender } = req.body;

    const sql = `
        UPDATE teachers
        SET name=?, email=?, phone=?, subject=?, gender=?
        WHERE id=?
    `;

    db.query(sql, [name, email, phone, subject, gender, id], (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Teacher updated successfully"
        });

    });

};

// =========================================
// DELETE TEACHER
// =========================================
exports.deleteTeacher = (req, res) => {

    const id = req.params.id;

    db.query("DELETE FROM teachers WHERE id = ?", [id], (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Teacher deleted successfully"
        });

    });

};