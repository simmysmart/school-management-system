// ===========================================================
// File: server.js
// Project: School Management System
// Purpose:
// Main Express Server
// ===========================================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

// ===========================================================
// Security Middleware
// ===========================================================

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ===========================================================
// Rate Limiter
// ===========================================================

const limiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 100,

    standardHeaders: true,

    legacyHeaders: false,

    message: {

        success: false,

        message: "Too many requests. Please try again later."

    }

});

app.use(limiter);

// ===========================================================
// Routes
// ===========================================================

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const classRoutes = require("./routes/classRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const feeRoutes = require("./routes/feeRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const resultRoutes = require("./routes/resultRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// ===========================================================
// API Routes
// ===========================================================

app.use("/api/auth", authRoutes);

app.use("/api/students", studentRoutes);

app.use("/api/teachers", teacherRoutes);

app.use("/api/classes", classRoutes);

app.use("/api/subjects", subjectRoutes);

app.use("/api/fees", feeRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/results", resultRoutes);

app.use("/api/attendance", attendanceRoutes);

app.use("/api/dashboard", dashboardRoutes);

// ===========================================================
// Home Route
// ===========================================================

app.get("/", (req, res) => {

    res.json({

        success: true,

        message: "School Management API is Running"

    });

});

// ===========================================================
// 404 Handler
// ===========================================================

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Route Not Found"

    });

});

// ===========================================================
// Global Error Handler
// ===========================================================

app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({

        success: false,

        message: "Internal Server Error"

    });

});

// ===========================================================
// Start Server
// ===========================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`🚀 Server running on http://localhost:${PORT}`);

});