"use strict";

var mongoose = require('mongoose');
var dbConnect = require('../dbConnect');
var merchantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }] // Assuming you have a Product model
});
dbConnect();
var Merchant = mongoose.model('Merchant', merchantSchema);
module.exports = Merchant;