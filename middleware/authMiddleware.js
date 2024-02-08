const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Merchant = require('../models/Merchant');

module.exports = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Attach user or merchant to request object
            req.user = await User.findById(decoded.id) || await Merchant.findById(decoded.id);
            next();
        } catch (err) {
            console.error(err);
            res.status(401).json({ message: 'Not authorized' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
