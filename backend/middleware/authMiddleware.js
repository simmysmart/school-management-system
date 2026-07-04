// Import the jsonwebtoken package
// This package is used to verify JWT tokens sent by users.
const jwt = require("jsonwebtoken");

// Middleware function that runs before protected routes
const verifyToken = (req, res, next) => {

    // Get the Authorization header from the request
    // Example:
    // Authorization: Bearer eyJhbGciOiJIUzI1Ni...
    const authHeader = req.headers.authorization;

    // If no Authorization header exists,
    // deny access immediately.
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Access denied. No token provided."
        });
    }

    // Extract only the JWT token.
    // "Bearer abc123" becomes "abc123"
    const token = authHeader.split(" ")[1];

    // If the token is missing or malformed
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Invalid token."
        });
    }

    try {

        // Verify that the token was signed
        // using our application's secret key.
        const decoded = jwt.verify(
            token,
            "myschoolsecretkey"
        );

        // Store the decoded user information
        // inside the request object.
        // Example:
        // req.user = {
        //     id: 1,
        //     username: "admin",
        //     role: "admin"
        // }
        req.user = decoded;

        // Continue to the next middleware or route.
        next();

    } catch (error) {

        // If verification fails, the token is
        // expired, invalid, or has been tampered with.
        return res.status(401).json({
            success: false,
            message: "Token is invalid or expired."
        });

    }

};

// Export the middleware so it can be used
// in any protected route.
module.exports = verifyToken;