import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cookieSession from 'cookie-session';

import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/notFoundError';
import { signUp } from './routes/signup';
import { connectDB } from './config/db';
import { signIn } from './routes/signin';
import { signOut } from './routes/signout';
import { currentUser } from './routes/currentUser';

dotenv.config();

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(signUp);
app.use(signIn);
app.use(signOut);
app.use(currentUser);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

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
