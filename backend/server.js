// =========================================
// Import Packages
// =========================================
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// =========================================
// Load Environment Variables
// =========================================
dotenv.config();

// =========================================
// Create Express App (IMPORTANT - MUST BE FIRST)
// =========================================
const app = express();

// =========================================
// Import Database
// =========================================
require("./db");

// =========================================
// Import Routes
// =========================================
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const classRoutes = require("./routes/classRoutes");


// =========================================
// Security Middleware
// =========================================
app.use(cors());
app.use(express.json());
app.use(helmet());

// =========================================
// Rate Limiter
// =========================================
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        message: "Too many login attempts. Try again later."
    }
});

// Apply limiter only to login
app.use("/api/auth/login", loginLimiter);

// =========================================
// Routes
// =========================================
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/classes", classRoutes);


// =========================================
// Home Route
// =========================================
app.get("/", (req, res) => {
    res.send("School Management API Running");
});

// =========================================
// Start Server
// =========================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("==================================");
    console.log(`Server running on port ${PORT}`);
    console.log("==================================");
});