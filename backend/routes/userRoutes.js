// ===========================================================
// File: userRoutes.js
// Project: School Management System
// Purpose:
// Handles all User Routes
// ===========================================================

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

const {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
} = require("../controllers/userController");

// ===========================================================
// DEBUG IMPORTS
// ===========================================================

console.log("====================================");
console.log("User Routes Debug");
console.log("====================================");
console.log("authMiddleware :", typeof authMiddleware);
console.log("authorize      :", typeof authorize);
console.log("getUsers       :", typeof getUsers);
console.log("getUserById    :", typeof getUserById);
console.log("addUser        :", typeof addUser);
console.log("updateUser     :", typeof updateUser);
console.log("deleteUser     :", typeof deleteUser);
console.log("====================================");

// ===========================================================
// GET ALL USERS
// ===========================================================

router.get(
    "/",
    authMiddleware,
    authorize("admin"),
    getUsers
);

// ===========================================================
// GET SINGLE USER
// ===========================================================

router.get(
    "/:id",
    authMiddleware,
    authorize("admin"),
    getUserById
);

// ===========================================================
// CREATE USER
// ===========================================================

router.post(
    "/",
    authMiddleware,
    authorize("admin"),
    addUser
);

// ===========================================================
// UPDATE USER
// ===========================================================

router.put(
    "/:id",
    authMiddleware,
    authorize("admin"),
    updateUser
);

// ===========================================================
// DELETE USER
// ===========================================================

router.delete(
    "/:id",
    authMiddleware,
    authorize("admin"),
    deleteUser
);

module.exports = router;