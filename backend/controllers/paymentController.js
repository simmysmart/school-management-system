// ===========================================================
// File: paymentController.js
// Project: School Management System
// Purpose:
// Handles all Payment CRUD operations.
// ===========================================================

const db = require("../db");

// ===========================================================
// GET ALL PAYMENTS
// ===========================================================
exports.getPayments = (req, res) => {

    const sql = `
        SELECT
            payments.id,
            students.first_name,
            students.last_name,
            fees.fee_name,
            payments.amount_paid,
            payments.payment_method,
            payments.payment_date
        FROM payments
        INNER JOIN students
            ON payments.student_id = students.id
        INNER JOIN fees
            ON payments.fee_id = fees.id
        ORDER BY payments.id DESC
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
// GET SINGLE PAYMENT
// ===========================================================
exports.getPayment = (req, res) => {

    const sql = `
        SELECT *
        FROM payments
        WHERE id = ?
    `;

    db.query(sql, [req.params.id], (err, results) => {

        if (err) {

            return res.status(500).json({

                success: false,
                message: err.message

            });

        }

        if (results.length === 0) {

            return res.status(404).json({

                success: false,
                message: "Payment not found."

            });

        }

        res.json({

            success: true,
            data: results[0]

        });

    });

};

// ===========================================================
// ADD PAYMENT
// ===========================================================
exports.addPayment = (req, res) => {

    const {

        student_id,
        fee_id,
        amount_paid,
        payment_method,
        payment_date

    } = req.body;

    if (

        !student_id ||
        !fee_id ||
        !amount_paid ||
        !payment_method ||
        !payment_date

    ) {

        return res.status(400).json({

            success: false,
            message: "All fields are required."

        });

    }

    const sql = `
        INSERT INTO payments
        (
            student_id,
            fee_id,
            amount_paid,
            payment_method,
            payment_date
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(

        sql,

        [

            student_id,
            fee_id,
            amount_paid,
            payment_method,
            payment_date

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
                message: "Payment added successfully."

            });

        }

    );

};

// ===========================================================
// UPDATE PAYMENT
// ===========================================================
exports.updatePayment = (req, res) => {

    const {

        student_id,
        fee_id,
        amount_paid,
        payment_method,
        payment_date

    } = req.body;

    const sql = `
        UPDATE payments
        SET

            student_id = ?,
            fee_id = ?,
            amount_paid = ?,
            payment_method = ?,
            payment_date = ?

        WHERE id = ?
    `;

    db.query(

        sql,

        [

            student_id,
            fee_id,
            amount_paid,
            payment_method,
            payment_date,
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
                message: "Payment updated successfully."

            });

        }

    );

};

// ===========================================================
// DELETE PAYMENT
// ===========================================================
exports.deletePayment = (req, res) => {

    const sql = `
        DELETE FROM payments
        WHERE id = ?
    `;

    db.query(sql, [req.params.id], (err) => {

        if (err) {

            return res.status(500).json({

                success: false,
                message: err.message

            });

        }

        res.json({

            success: true,
            message: "Payment deleted successfully."

        });

    });

};