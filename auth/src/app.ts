import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cookieSession from 'cookie-session';

import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/notFoundError';
import { signUp } from './routes/signup';
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

export { app };
