const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
    const { name, price, description, category, quantity, imageUrl } = req.body;
    try {
        const newProduct = new Product({
            name, price, description, category, quantity, imageUrl, merchant: req.user.id
        });
        const product = await newProduct.save();
        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('merchant', 'name');
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};
exports.updateProduct = async (req, res) => {
    const { productId } = req.params;
    const { name, price, description, category, quantity, imageUrl } = req.body;

    try {
        let product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the logged-in merchant owns the product
        if (product.merchant.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        product = await Product.findByIdAndUpdate(productId, { name, price, description, category, quantity, imageUrl }, { new: true });

        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};
exports.deleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the logged-in merchant owns the product
        if (product.merchant.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await product.deleteOne();

        res.json({ message: 'Product removed' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

