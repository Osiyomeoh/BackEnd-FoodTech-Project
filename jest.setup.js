const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  // Replace the MongoClient connection URI in your app with the in-memory database URI
  process.env.MONGODB_URI = mongoUri;
}, 10000);

afterAll(async () => {
  if (mongoServer) {
    await mongoServer.stop();
  }
});
