const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dbConnect = require('../dbConnect');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    googleId: String,
    name: String,
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
dbConnect();
const User = mongoose.model('sam', userSchema);

module.exports = User;
