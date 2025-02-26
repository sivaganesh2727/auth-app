const express = require('express');
const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router = express.Router();

router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);

module.exports = router;