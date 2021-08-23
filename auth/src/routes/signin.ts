import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { User } from '../models/userModel';
import { BadRequest } from '../errors/badRequest';
import { validationRequest } from '../middlewares/validateRequest';

const route = express.Router();

route.post(
  '/api/auth/login',
  [
    body('email').isEmail().withMessage('Email must be valid'),

    body('password').trim().notEmpty().withMessage('Password must be supplied'),
  ],
  validationRequest,
  (req: Request, res: Response) => {}
);

export { route as signIn };
