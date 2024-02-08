const mongoose = require('mongoose');
const dbConnect = require('../dbConnect');

const merchantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] // Assuming you have a Product model
});

dbConnect();

const Merchant = mongoose.model('Merchant', merchantSchema);

module.exports = Merchant;
