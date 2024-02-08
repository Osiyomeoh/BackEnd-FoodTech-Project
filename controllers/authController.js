require('dotenv').config();

const User = require('../models/User');
const Merchant = require('../models/Merchant');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    console.log(`Generating token for user/merchant with ID: ${id}`);
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(`Registering user with email: ${email}`);

    try {
        let user = await User.findOne({ email });
        if (user) {
            console.log(`User with email ${email} already exists`);
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({ name, email, password });
        // user.password = await bcrypt.hash(password, 10);
        console.log(user)
        await user.save();
        console.log(user)

        console.log(`User registered with email: ${email}`);
        res.status(201).json({ token: generateToken(user._id) });
    } catch (err) {
        console.error(`Error registering user with email ${email}:`, err);
        res.status(500).send('Server error');
    }
};

exports.registerMerchant = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(`Registering merchant with email: ${email}`);

    try {
        let merchant = await Merchant.findOne({ email });
        if (merchant) {
            console.log(`Merchant with email ${email} already exists`);
            return res.status(400).json({ message: 'Merchant already exists' });
        }

        merchant = new Merchant({ name, email, password });
        merchant.password = await bcrypt.hash(password, 10);
        await merchant.save();

        console.log(`Merchant registered with email: ${email}`);
        res.status(201).json({ token: generateToken(merchant._id) });
    } catch (err) {
        console.error(`Error registering merchant with email ${email}:`, err);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { email, password, userType } = req.body;
    console.log(`Attempting login for ${userType} with email: ${email}`);

    try {
        const user = userType === 'user' ? await User.findOne({ email }) : await Merchant.findOne({ email });

        if (!user) {
            console.log(`No ${userType} found with email ${email}`);
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        console.log("Hashed password from DB:", user.password);
        console.log("Plain password from login attempt:", password);
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log(`Password mismatch for ${userType} with email ${email}`);
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        console.log(`${userType} logged in with email: ${email}`);
        res.json({ token: generateToken(user._id) });
    } catch (err) {
        console.error(`Error logging in ${userType} with email ${email}:`, err);
        res.status(500).send('Server error');
    }
};
