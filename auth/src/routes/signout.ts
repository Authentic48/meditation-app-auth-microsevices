import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const route = express.Router();

route.post('/api/auth/signout', async (req: Request, res: Response) => {
  req.session = null;

  res.json({});
});

export { route as signOut };
