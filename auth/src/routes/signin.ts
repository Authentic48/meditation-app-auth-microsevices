import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/userModel';
import { BadRequest } from '../errors/badRequest';
import { validationRequest } from '../middlewares/validateRequest';
import { Password } from '../services/password';

const route = express.Router();

route.post(
  '/api/auth/login',
  [
    body('email').isEmail().withMessage('Email must be valid'),

    body('password').trim().notEmpty().withMessage('Password must be supplied'),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existUser = await User.findOne({ email });

    if (!existUser) {
      throw new BadRequest('Invalid credentials');
    }

    const passwordsMatch = await Password.Compare(password, existUser.password);

    if (!passwordsMatch) {
      throw new BadRequest('Invalid credentials');
    }

    console.log(passwordsMatch);

    const userJwt = jwt.sign(
      {
        id: existUser.id,
        name: existUser.name,
        email: existUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    return res.status(200).json(existUser);
  }
);

export { route as signIn };
