import express from 'express';
import dotenv from 'dotenv';

import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/notFoundError';
import { signUp } from './routes/signup';

dotenv.config();

const app = express();

app.use(signUp)

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App in ${process.env.NODE_ENV} is running on ${PORT}`);
});
