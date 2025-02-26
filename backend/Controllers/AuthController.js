const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");

const signup = async (req, res) => {
    console.log("Signup Route Hit");
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser  = await UserModel.findOne({ email });
        if (existingUser ) {
            return res.status(400).json({ message: 'User  already exists, please login', success: false });
        }

        // Hash password and save user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser  = new UserModel({ name, email, password: hashedPassword });
        await newUser .save();

        res.status(201).json({ message: "Signup successful", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(403).json({ message: 'Invalid email or password', success: false });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({ message: 'Invalid email or password', success: false });
        }

        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            token,
            user: { name: user.name, email: user.email }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports = { signup, login };
           