// const supertest = require('supertest');
// const { MongoMemoryServer } = require('mongodb-memory-server');
// const mongoose = require('mongoose');
// const app = require('../app'); // Adjust the path as necessary

// let mongoServer;

// beforeAll(async () => {
//   // Setup the in-memory MongoDB server
//   mongoServer = await MongoMemoryServer.create();
//   const mongoUri = mongoServer.getUri();
//   await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
// });

// afterAll(async () => {
//   // Disconnect and stop the in-memory MongoDB server
//   await mongoose.disconnect();
//   await mongoServer.stop();
// });

// describe('GET /api/user/profile', () => {
//   it('should return the user profile for a logged-in user', async () => {
//     // Note: Ensure you have logic to handle authentication and generate a token for testing
//     const userTestToken = 'your_test_token'; // Replace this with logic to generate a test token

//     const response = await supertest(app)
//       .get('/api/user/profile')
//       .set('Authorization', `Bearer ${userTestToken}`);

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty('email');
//     // Add more expectations as needed
//   });
// });
