import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';

import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/notFoundError';
import { signUp } from './routes/signup';
import { connectDB } from './config/db';


dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(signUp);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App in ${process.env.NODE_ENV} is running on ${PORT}`);
});
