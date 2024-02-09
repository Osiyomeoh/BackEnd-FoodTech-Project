const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dbConnect = require('../dbConnect');

const merchantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] 
});

// Hash the password before saving
merchantSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
dbConnect();
const Merchant = mongoose.model('Merchant', merchantSchema);

module.exports = Merchant;
