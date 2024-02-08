"use strict";

var express = require('express');
var router = express.Router();
var _require = require('../controllers/productController'),
  addProduct = _require.addProduct,
  getProducts = _require.getProducts,
  updateProduct = _require.updateProduct,
  deleteProduct = _require.deleteProduct;
var authMiddleware = require('../middleware/authMiddleware');
router.post('/', authMiddleware, addProduct);
router.get('/', getProducts);
router.put('/:productId', authMiddleware, updateProduct);
router["delete"]('/:productId', authMiddleware, deleteProduct);
module.exports = router;