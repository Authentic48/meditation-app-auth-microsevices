import express, { Request, Response } from 'express';
import { Meditation } from '../model/meditation';

const route = express.Router();

route.get('/api/meditations', async (req: Request, res: Response) => {
  const meditations = await Meditation.find({});

  return res.send(meditations);
});

export { route as MeditationGetAll };
