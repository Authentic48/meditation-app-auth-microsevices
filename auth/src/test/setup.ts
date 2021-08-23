import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { connections } from 'mongoose';
import { app } from '../app';

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KET = 'bladhyvlaSBkxgtcs';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
