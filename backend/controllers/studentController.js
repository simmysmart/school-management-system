// =========================================
// Student Controller
// Handles Student CRUD Operations
// =========================================

const db = require("../db");

// =========================================
// Add Student
// =========================================
exports.addStudent = (req, res) => {

    const {
        admission_number,
        first_name,
        last_name,
        gender,
        date_of_birth,
        student_class,
        phone,
        email,
        address
    } = req.body;

    const sql = `
        INSERT INTO students
        (
            admission_number,
            first_name,
            last_name,
            gender,
            date_of_birth,
            class,
            phone,
            email,
            address
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            admission_number,
            first_name,
            last_name,
            gender,
            date_of_birth,
            student_class,
            phone,
            email,
            address
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
                message: "Student added successfully."
            });

        }
    );

};

// =========================================
// Get All Students
// =========================================
exports.getStudents = (req, res) => {

    db.query(
        "SELECT * FROM students ORDER BY id DESC",
        (err, results) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                students: results
            });

        }
    );

};

// =========================================
// Get One Student
// =========================================
exports.getStudentById = (req, res) => {

    const id = req.params.id;

    db.query(
        "SELECT * FROM students WHERE id = ?",
        [id],
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
                    message: "Student not found."
                });
            }

            res.json({
                success: true,
                student: results[0]
            });

        }
    );

};

// =========================================
// Update Student
// =========================================
exports.updateStudent = (req, res) => {

    const id = req.params.id;

    const {
        admission_number,
        first_name,
        last_name,
        gender,
        date_of_birth,
        student_class,
        phone,
        email,
        address
    } = req.body;

    const sql = `
        UPDATE students
        SET
            admission_number = ?,
            first_name = ?,
            last_name = ?,
            gender = ?,
            date_of_birth = ?,
            class = ?,
            phone = ?,
            email = ?,
            address = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            admission_number,
            first_name,
            last_name,
            gender,
            date_of_birth,
            student_class,
            phone,
            email,
            address,
            id
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
                message: "Student updated successfully."
            });

        }
    );

};

// =========================================
// Delete Student
// =========================================
exports.deleteStudent = (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM students WHERE id = ?",
        [id],
        (err) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                message: "Student deleted successfully."
            });

        }
    );

};