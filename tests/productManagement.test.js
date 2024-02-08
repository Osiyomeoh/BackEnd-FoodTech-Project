const supertest = require('supertest');
const app = require('../app'); // Adjust the path to your app file
const Product = require('../models/Product');
const User = require('../models/User'); // Adjust the path to your User model
const jwt = require('jsonwebtoken');
const mockingoose = require('mockingoose');

describe('Product Routes', () => {
  let token;

  beforeAll(() => {
    // Generate a valid JWT token for testing
    const payload = { id: 'someUserId' };
    
    token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Mock user or merchant findById to support middleware authentication
    mockingoose(User).toReturn({ _id: 'someUserId', name: 'Test User' }, 'findOne');
  });

  beforeEach(() => {
    mockingoose(Product).reset();
    jest.clearAllMocks();
  });

  it('should add a new product with valid token', async () => {
    const newProduct = {
      name: 'Test Product',
      price: 100,
      description: 'Test Description',
      category: 'Test Category',
      quantity: 10,
      imageUrl: 'http://example.com/test.jpg',
    };

    // Mock Product.save to simulate saving a new product
    mockingoose(Product).toReturn(newProduct, 'save');

    const response = await supertest(app)
      .post('/api/products') // Adjust the endpoint as per your API
      .set('Authorization', `Bearer ${token}`)
      .send(newProduct);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('name', newProduct.name);
    // Add more assertions as needed
  });

  it('should get all products with valid token', async () => {
    // Mock Product.find to return a list of products
    mockingoose(Product).toReturn([ /* array of product objects */ ], 'find');

    const response = await supertest(app)
      .get('/api/products') // Adjust the endpoint as per your API
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    // Add more assertions as needed
  });

  // it('should update a product with valid token', async () => {
  //   const productId = 'someProductId';
  //   const updateData = {
  //     name: 'Updated Product',
  //     price: 150,
  //     // Add more fields as necessary
  //   };

  //   // Mock Product.findById to return an existing product
  //   mockingoose(Product).toReturn({ _id: productId, ...updateData }, 'findOneAndUpdate');

  //   const response = await supertest(app)
  //     .put(`/api/products/${productId}`) // Adjust the endpoint as per your API
  //     .set('Authorization', `Bearer ${token}`)
  //     .send(updateData);

  //   expect(response.statusCode).toBe(200);
  //   expect(response.body).toHaveProperty('name', updateData.name);
  //   // Add more assertions as needed
  // });

  // it('should delete a product with valid token', async () => {
  //   const productId = 'someProductId';

  //   // Mock Product.findById to simulate product found
  //   mockingoose(Product).toReturn({ _id: productId }, 'findOne');
  //   // Mock Product.remove to simulate product deletion
  //   mockingoose(Product).toReturn({ _id: productId }, 'remove');

  //   const response = await supertest(app)
  //     .delete(`/api/products/${productId}`) // Adjust the endpoint as per your API
  //     .set('Authorization', `Bearer ${token}`);

  //   expect(response.statusCode).toBe(200);
  //   expect(response.body).toHaveProperty('message', 'Product removed');
  //   // Add more assertions as needed
  // });

  // // Add more tests as needed...
});
