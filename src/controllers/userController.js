const User = require('../models/User');

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    const { name, email } = req.body;

    const userFields = {};
    if (name) userFields.name = name;
    if (email) userFields.email = email;

    try {
        let user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ msg: 'User not found' });

        // Ensure the user matches the profile they're trying to update
        if (user.id.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        user = await User.findByIdAndUpdate(req.user.id, { $set: userFields }, { new: true });

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
