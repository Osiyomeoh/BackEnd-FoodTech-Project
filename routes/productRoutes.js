const express = require('express');
const router = express.Router();
const { addProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, addProduct); 
router.get('/', getProducts);
router.put('/:productId', authMiddleware, updateProduct); 
router.delete('/:productId', authMiddleware, deleteProduct); 

module.exports = router;
