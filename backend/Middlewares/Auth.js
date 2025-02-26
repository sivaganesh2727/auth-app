const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract Bearer token

    if (!token) {
        return res.status(403).json({ message: 'Unauthorized: Token required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Unauthorized: Invalid or expired token' });
    }
};

module.exports = ensureAuthenticated;