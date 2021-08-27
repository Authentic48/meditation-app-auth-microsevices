import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import {
  currentLogInUser,
  errorHandler,
  NotFoundError,
} from '@authentic48/common';

import { MeditationCreate } from './routes/new';
import { MeditationGetAll } from './routes/index';
import { MeditationShow } from './routes/show';
import { MeditationUpdate } from './routes/update';
import { uploadFile } from './routes/upload-image';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(currentLogInUser);
app.use(MeditationCreate);
app.use(MeditationShow);
app.use(MeditationGetAll);
app.use(MeditationUpdate);
app.use(uploadFile);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
