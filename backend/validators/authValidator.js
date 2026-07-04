const { body, validationResult } = require("express-validator");

// Validation rules for admin registration
const registerValidation = [

    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required.")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters."),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email address."),

    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long.")
];

// Middleware to return validation errors
const validate = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    next();
};

module.exports = {
    registerValidation,
    validate
};