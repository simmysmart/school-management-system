const db = require("../db");

// =========================================
// Get All Fees
// =========================================
exports.getFees = (req, res) => {

    const sql = `
        SELECT
            fees.id,
            fees.fee_name,
            fees.amount,
            fees.created_at,
            classes.class_name
        FROM fees
        LEFT JOIN classes
            ON fees.class_id = classes.id
        ORDER BY fees.fee_name ASC
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
// Add Fee
// =========================================
exports.addFee = (req, res) => {

    const {
        fee_name,
        amount,
        class_id
    } = req.body;

    // Validation
    if (!fee_name || !amount || !class_id) {

        return res.status(400).json({
            success: false,
            message: "Fee name, amount and class are required."
        });

    }

    const sql = `
        INSERT INTO fees
        (fee_name, amount, class_id)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [
            fee_name,
            amount,
            class_id
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
                message: "Fee added successfully."
            });

        }
    );

};

// =========================================
// Get Single Fee
// =========================================
exports.getFeeById = (req, res) => {

    db.query(
        "SELECT * FROM fees WHERE id = ?",
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
                    message: "Fee not found."
                });

            }

            res.json({
                success: true,
                data: results[0]
            });

        }
    );

};

// =========================================
// Update Fee
// =========================================
exports.updateFee = (req, res) => {

    const {
        fee_name,
        amount,
        class_id
    } = req.body;

    // Validation
    if (!fee_name || !amount || !class_id) {

        return res.status(400).json({
            success: false,
            message: "Fee name, amount and class are required."
        });

    }

    const sql = `
        UPDATE fees
        SET
            fee_name = ?,
            amount = ?,
            class_id = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            fee_name,
            amount,
            class_id,
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
                message: "Fee updated successfully."
            });

        }
    );

};

// =========================================
// Delete Fee
// =========================================
exports.deleteFee = (req, res) => {

    db.query(
        "DELETE FROM fees WHERE id = ?",
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
                message: "Fee deleted successfully."
            });

        }
    );

};