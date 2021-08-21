import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/userModel';
import { RequestValidationError } from '../errors/validationError';
import { BadRequest } from '../errors/badRequest';

const route = express.Router();

route.post('/api/auth/login', (req: Request, res: Response) => {

})

export { route as signIn }
