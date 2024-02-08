const Merchant = require('../models/Merchant');

// Get merchant profile
exports.getMerchantProfile = async (req, res) => {
    try {
        const merchant = await Merchant.findById(req.user.id).select('-password');
        res.json(merchant);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update merchant profile
exports.updateMerchantProfile = async (req, res) => {
    const { name, email } = req.body;

    const merchantFields = {};
    if (name) merchantFields.name = name;
    if (email) merchantFields.email = email;

    try {
        let merchant = await Merchant.findById(req.user.id);

        if (!merchant) return res.status(404).json({ msg: 'Merchant not found' });

        // Ensure the merchant matches the profile they're trying to update
        if (merchant.id.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Merchant not authorized' });
        }

        merchant = await Merchant.findByIdAndUpdate(req.user.id, { $set: merchantFields }, { new: true });

        res.json(merchant);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
