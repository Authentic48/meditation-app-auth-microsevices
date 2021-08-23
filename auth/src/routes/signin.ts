import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/userModel';
import { RequestValidationError } from '../errors/validationError';
import { BadRequest } from '../errors/badRequest';

const route = express.Router();

route.post(
  '/api/auth/login',
  [
    body('email').isEmail().withMessage('Email must be valid'),

    body('password').trim().notEmpty().withMessage('Password must be supplied'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
  }
);

export { route as signIn };
