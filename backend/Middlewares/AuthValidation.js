const Joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required().messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 3 characters long',
            'string.max': 'Name must be less than 100 characters'
        }),
        email: Joi.string().email().required().messages({
            'string.email': 'Invalid email format',
            'string.empty': 'Email is required'
        }),
        password: Joi.string().min(4).max(100).required().messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 4 characters long',
            'string.max': 'Password must be less than 100 characters'
        })
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            message: "Validation failed",
            errors: error.details.map(detail => detail.message) // Extract meaningful error messages
        });
    }
    next();
};

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Invalid email format',
            'string.empty': 'Email is required'
        }),
        password: Joi.string().min(4).max(100).required().messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 4 characters long',
            'string.max': 'Password must be less than 100 characters'
        })
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            message: "Validation failed",
            errors: error.details.map(detail => detail.message)
        });
    }
    next();
};

module.exports = {
    signupValidation,
    loginValidation
};
