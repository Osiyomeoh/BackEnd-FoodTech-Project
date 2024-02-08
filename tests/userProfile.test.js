// userProfile.test.js
const supertest = require('supertest');
const app = require('../app'); // Adjust the path to your Express app
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const mockingoose = require('mockingoose'); // Note the `.default` if using ES6 imports elsewhere

describe('User Profile Routes', () => {
  let token;
  let mockUserId = 'someMockUserId';

  beforeAll(() => {
    jwt.sign = jest.fn().mockReturnValue('fakeToken');
    jwt.verify = jest.fn().mockReturnValue({ id: 'MockUserId' }); // Mock payload returned by jwt.verify
    token = 'Bearer fakeToken';
  });
  
  beforeEach(() => {
    mockingoose(User).reset();
  });

  it('should return the user profile', async () => {
    // Mock User.findById for the getUserProfile function
    mockingoose(User).toReturn({ _id: mockUserId, name: 'Test User', email: 'test@example.com' }, 'findOne');

    const response = await supertest(app)
      .get('/api/user/profile') // Adjust the endpoint as per your API
      .set('Authorization', token);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('email', 'test@example.com');
    // Add more assertions as needed
  });

  it('should update the user profile', async () => {
    const updateData = { name: 'Updated Name', email: 'updated@example.com' };
  
    // Mock User.findById for the authentication middleware to return a user object
    mockingoose(User).toReturn({ _id: mockUserId, name: 'Test User', email: 'test@example.com' }, 'findOne');
  
    // Mock User.findByIdAndUpdate for the updateUserProfile function to return the updated user object
    mockingoose(User).toReturn({ _id: mockUserId, ...updateData }, 'findOneAndUpdate');
  
    const response = await supertest(app)
      .put('/api/user/profile') // Adjust the endpoint as per your API
      .set('Authorization', token)
      .send(updateData);
      console.log(response.body)
  
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', updateData.name);
    expect(response.body).toHaveProperty('email', updateData.email);
    // Add more assertions as needed
  });
  

  // Add more tests as needed...
});
