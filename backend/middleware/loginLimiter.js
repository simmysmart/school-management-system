const rateLimit = require("express-rate-limit");

console.log("✅ NEW LOGIN LIMITER LOADED");

const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: "Too many login attempts."
    }
});

module.exports = loginLimiter;