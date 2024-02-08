const supertest = require('supertest');
const app = require('../app'); 
const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
const mockingoose = require('mockingoose');
const bcrypt = require('bcryptjs'); 

describe('Auth Routes', () => {
  beforeEach(() => {
    
    mockingoose(User).reset();
    
    jest.clearAllMocks();
  });
  

  it('should register a new user', async () => {
    const userData = {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123',
    };

    
    mockingoose(User).toReturn(null, 'findOne'); 
    mockingoose(User).toReturn(userData, 'save'); 

    
    jwt.sign = jest.fn().mockReturnValue('fakeToken');

    const response = await supertest(app)
      .post('/api/auth/register/user')
      .send(userData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(jwt.sign).toHaveBeenCalledWith(expect.anything(), expect.any(String), expect.any(Object));
  });



it('should register a new merchant', async () => {
  const merchantData = {
    name: 'Test Merchant',
    email: 'testmerchant@example.com',
    password: 'password123',
  };

 
  mockingoose(User).toReturn(null, 'findOne'); 
  mockingoose(User).toReturn(merchantData, 'save'); 

  // Mock the jwt.sign function to return a fake token
  jwt.sign = jest.fn().mockReturnValue('fakeToken');

  const response = await supertest(app)
    .post('/api/auth/register/merchant') // Adjust the endpoint as per your API
    .send(merchantData);

  expect(response.statusCode).toBe(201);
  expect(response.body).toHaveProperty('token');
  expect(jwt.sign).toHaveBeenCalledWith(expect.anything(), expect.any(String), expect.any(Object));
});

it('should login a user with correct credentials', async () => {
  const loginData = {
    email: 'testuser@example.com',
    password: 'password123',
    userType: 'user', // Specify the userType here
  };

  
  const hashedPassword = await bcrypt.hash('password123', 12); 

  
  mockingoose(User).toReturn({
    email: 'testuser@example.com',
    password: hashedPassword, 
  }, 'findOne');

  
  jwt.sign = jest.fn().mockReturnValue('fakeToken');

  const response = await supertest(app)
    .post('/api/auth/login') 
    .send(loginData);

  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('token');
  expect(jwt.sign).toHaveBeenCalledWith(expect.anything(), expect.any(String), expect.any(Object));
});



});
