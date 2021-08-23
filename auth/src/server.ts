import { connectDB } from './config/db';
import { app } from './app';

const PORT = process.env.PORT || 5000;

const start = () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  connectDB();

  app.listen(PORT, () => {
    console.log(`App in ${process.env.NODE_ENV} is running on ${PORT}`);
  });
};

start();
