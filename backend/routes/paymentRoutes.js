const express = require("express");

const router = express.Router();

const paymentController = require("../controllers/paymentController");

router.get("/", paymentController.getPayments);

router.get("/:id", paymentController.getPayment);

router.post("/", paymentController.addPayment);

router.put("/:id", paymentController.updatePayment);

router.delete("/:id", paymentController.deletePayment);

module.exports = router;