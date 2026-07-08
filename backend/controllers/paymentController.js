const db = require("../db");

// ===========================
// Get All Payments
// ===========================
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
        JOIN students ON payments.student_id = students.id
        JOIN fees ON payments.fee_id = fees.id
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

// ===========================
// Get One Payment
// ===========================
exports.getPayment = (req, res) => {

    db.query(
        "SELECT * FROM payments WHERE id=?",
        [req.params.id],
        (err, results) => {

            if (err) {
                return res.status(500).json({
                    success:false,
                    message:err.message
                });
            }

            res.json({
                success:true,
                data:results[0]
            });

        }
    );

};

// ===========================
// Add Payment
// ===========================
exports.addPayment = (req, res) => {

    const {

        student_id,
        fee_id,
        amount_paid,
        payment_method,
        payment_date

    } = req.body;

    db.query(

        `INSERT INTO payments
        (student_id,fee_id,amount_paid,payment_method,payment_date)
        VALUES(?,?,?,?,?)`,

        [
            student_id,
            fee_id,
            amount_paid,
            payment_method,
            payment_date
        ],

        (err)=>{

            if(err){

                return res.status(500).json({

                    success:false,
                    message:err.message

                });

            }

            res.json({

                success:true,
                message:"Payment added successfully"

            });

        }

    );

};

// ===========================
// Update Payment
// ===========================
exports.updatePayment = (req,res)=>{

    const {

        student_id,
        fee_id,
        amount_paid,
        payment_method,
        payment_date

    }=req.body;

    db.query(

        `UPDATE payments
        SET
        student_id=?,
        fee_id=?,
        amount_paid=?,
        payment_method=?,
        payment_date=?
        WHERE id=?`,

        [

            student_id,
            fee_id,
            amount_paid,
            payment_method,
            payment_date,
            req.params.id

        ],

        (err)=>{

            if(err){

                return res.status(500).json({

                    success:false,
                    message:err.message

                });

            }

            res.json({

                success:true,
                message:"Payment updated successfully"

            });

        }

    );

};

// ===========================
// Delete Payment
// ===========================
exports.deletePayment=(req,res)=>{

    db.query(

        "DELETE FROM payments WHERE id=?",

        [req.params.id],

        (err)=>{

            if(err){

                return res.status(500).json({

                    success:false,
                    message:err.message

                });

            }

            res.json({

                success:true,
                message:"Payment deleted successfully"

            });

        }

    );

};