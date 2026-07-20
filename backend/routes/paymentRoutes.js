// ===========================================================
// File: paymentRoutes.js
// ===========================================================

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const paymentController = require("../controllers/paymentController");

router.get("/", authMiddleware, paymentController.getPayments);

router.get("/:id", authMiddleware, paymentController.getPayment);

router.post("/", authMiddleware, paymentController.addPayment);

router.put("/:id", authMiddleware, paymentController.updatePayment);

router.delete("/:id", authMiddleware, paymentController.deletePayment);

module.exports = router;