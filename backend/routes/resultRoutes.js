// ===========================================================
// File: resultRoutes.js
// ===========================================================

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getResults,
    getResult,
    addResult,
    updateResult,
    deleteResult
} = require("../controllers/resultController");

router.get("/", authMiddleware, getResults);

router.get("/:id", authMiddleware, getResult);

router.post("/", authMiddleware, addResult);

router.put("/:id", authMiddleware, updateResult);

router.delete("/:id", authMiddleware, deleteResult);

module.exports = router;