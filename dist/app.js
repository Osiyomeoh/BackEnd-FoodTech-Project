"use strict";

var express = require('express');
require('dotenv').config();
var cors = require('cors');
var _require = require('mongodb'),
  MongoClient = _require.MongoClient,
  ServerApiVersion = _require.ServerApiVersion;
var dbConnect = require('./dbConnect');
var authRoutes = require('./routes/authRoutes');
var userRoutes = require('./routes/userRoutes');
var merchantRoutes = require('./routes/merchantRoutes');
var productRoutes = require('./routes/productRoutes');
var authMiddleware = require('./middleware/authMiddleware');
var app = express();
app.use(cors());
app.use(express.json());
dbConnect();
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/merchant', merchantRoutes);
app.use('/api/products', authMiddleware, productRoutes);
app.use(function (req, res, next) {
  res.status(404).send('Endpoint not found');
});
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
if (process.env.NODE_ENV !== 'test') {
  var PORT = process.env.PORT || 5000;
  app.listen(PORT, function () {
    return console.log("Server running on port ".concat(PORT));
  });
}
module.exports = app;