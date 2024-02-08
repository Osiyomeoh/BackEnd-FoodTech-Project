const mongoose = require('mongoose');
const dbConnect = require('../dbConnect');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Product price must be a positive number']
    },
    description: {
        type: String,
        required: [true, 'Product description is required']
    },
    category: {
        type: String,
        required: [true, 'Product category is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
        min: [0, 'Product quantity must be a positive number']
    },
    imageUrl: {
        type: String,
        required: [true, 'Product image URL is required']
    },
    merchant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Merchant',
        required: [true, 'Product must belong to a merchant']
    }
}, { timestamps: true });
dbConnect();

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
