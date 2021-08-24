import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from '@authentic48/common';
import express, { Request, Response } from 'express';
import { Meditation } from '../model/meditation';

const route = express.Router();

route.put(
  '/api/meditations/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const meditation = await Meditation.findById(req.params.id);

    if (!meditation) {
      throw new NotFoundError();
    }

    if (meditation.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    meditation.set({
      title: req.body.title,
      subtitle: req.body.subtitle,
      order: req.body.order,
      time: req.body.time,
      track: req.body.track,
      uri: req.body.uri,
      image: req.body.image,
    });

    await meditation.save();

    return res.status(200).send(meditation);
  }
);

export { route as MeditationUpdate };
