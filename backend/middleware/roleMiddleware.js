// =========================================
// Role Authorization Middleware
// -----------------------------------------
// This middleware checks whether the logged-in
// user has permission to access a specific route.
// =========================================

const authorize = (...roles) => {

    // Return the middleware function
    return (req, res, next) => {

        // Check if the user has been authenticated.
        // The authMiddleware should have already
        // verified the JWT and stored the user's
        // information in req.user.
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated."
            });
        }

        // Check if the user's role is one of the
        // allowed roles for this route.
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Access forbidden. You do not have permission to access this resource."
            });
        }

        // The user is authenticated and authorized.
        // Continue to the next middleware or route.
        next();
    };

};

// Export the middleware so it can be used in routes.
module.exports = authorize;