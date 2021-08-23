import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { currentLogInUser } from '../middlewares/currentUser';
import { requireAuth } from '../middlewares/requireAuth';

const route = express.Router();

route.get(
  '/api/auth/currentuser',
  currentLogInUser,
  requireAuth,
  (req: Request, res: Response) => {
    res.json({ currentUser: req.currentUser || null });
  }
);

export { route as currentUser };
