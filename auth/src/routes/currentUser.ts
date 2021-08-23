import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { currentLogInUser } from '../middlewares/currentUser';

const route = express.Router();

route.get(
  '/api/auth/currentuser',
  currentLogInUser,
  (req: Request, res: Response) => {
    res.json({ currentUser: req.currentUser });
  }
);

export { route as currentUser };
