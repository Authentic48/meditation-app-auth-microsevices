import express, { json, Request, Response } from 'express';
import { CustomError } from '../errors/customError';
import { User } from '../models/userModel';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post(
  '/api/auth/register',
  [
    body('name').isString().withMessage('Name is invalid'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json(errors);
    }
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ message: 'User already exist' });
    }

    const user = User.build({ name, email, password });
    await user.save();

    res.status(201).send(user);
  }
);

export { router as signUp };
