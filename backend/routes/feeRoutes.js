// ======================================================
// File: feeRoutes.js
// Project: School Management System
// ======================================================

const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const permit = require("../middleware/roleMiddleware");

const feeController = require("../controllers/feeController");


// =========================================
// Get All Fees
// =========================================

router.get(

    "/",

    auth,

    permit("admin"),

    feeController.getFees

);


// =========================================
// Add Fee
// =========================================

router.post(

    "/",

    auth,

    permit("admin"),

    feeController.addFee

);


// =========================================
// Get Fee By ID
// =========================================

router.get(

    "/:id",

    auth,

    permit("admin"),

    feeController.getFeeById

);


// =========================================
// Update Fee
// =========================================

router.put(

    "/:id",

    auth,

    permit("admin"),

    feeController.updateFee

);


// =========================================
// Delete Fee
// =========================================

router.delete(

    "/:id",

    auth,

    permit("admin"),

    feeController.deleteFee

);

module.exports = router;