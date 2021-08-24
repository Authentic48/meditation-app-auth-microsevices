import { NotFoundError } from '@authentic48/common';
import express, { Request, Response } from 'express';
import { Meditation } from '../model/meditation';

const route = express.Router();

route.get('/api/meditations/:id', async (req: Request, res: Response) => {
  const meditation = await Meditation.findById(req.params.id);

  if (!meditation) {
    throw new NotFoundError();
  }

  return res.status(200).send(meditation);
});

export { route as MeditationShow };
