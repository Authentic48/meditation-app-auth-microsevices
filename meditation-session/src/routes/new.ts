import { requireAuth, validationRequest } from '@authentic48/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { Meditation } from '../model/meditation';

const route = express.Router();

route.post(
  '/api/meditations/create',
  requireAuth,
  [
    body('title')
      .isString()
      .isLength({ min: 4 })
      .withMessage('title must be defined'),
    body('subtitle')
      .isString()
      .notEmpty()
      .withMessage('subtitle must be defined'),
    body('track').isNumeric().notEmpty().withMessage('track must be defined'),
    body('order').isNumeric().notEmpty().withMessage('order must be defined'),
    body('time').isNumeric().notEmpty().withMessage('time must be defined'),
    body('uri').isString().notEmpty().withMessage('uri must be defined'),
    body('image').isString().notEmpty().withMessage('image must be defined'),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const { title, subtitle, track, order, time, uri, image } = req.body;

    const meditation = Meditation.build({
      title,
      subtitle,
      order,
      time,
      uri,
      image,
      userId: req.currentUser!.id,
      track,
    });

    await meditation.save();

    res.status(201).send(meditation);
  }
);

export { route as MeditationCreate };
