const express = require('express');
require('dotenv').config();

const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const dbConnect = require('./dbConnect');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const merchantRoutes = require('./routes/merchantRoutes');
const productRoutes = require('./routes/productRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

dbConnect();

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/merchant', merchantRoutes);
app.use('/api/products', authMiddleware, productRoutes);

app.use((req, res, next) => {
  res.status(404).send('Endpoint not found');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
