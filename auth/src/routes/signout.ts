import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/userModel';
import { BadRequest } from '../errors/badRequest';
import { validationRequest } from '../middlewares/validateRequest';

const route = express.Router();

route.post('/api/auth/currentuser', async (req: Request, res: Response) => {});

export { route as signOut };
