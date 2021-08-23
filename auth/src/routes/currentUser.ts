import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const route = express.Router();

route.get('/api/auth/currentuser', async (req: Request, res: Response) => {
  if (!req.session?.jwt) {
    return res.json({ currentUser: null });
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    return res.json({ currentUser: payload });
  } catch (error) {
    return res.json({ currentUser: null });
  }
});

export { route as currentUser };
