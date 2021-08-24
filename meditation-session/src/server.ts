import { connectDB } from './config/db';
import { app } from './app';

const PORT = 5000;

const start = () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  connectDB();

  app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
  });
};

start();
