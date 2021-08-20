import { CustomError } from '../errors/customError';
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errors: err.serializeError() });
  }

  res.status(400).json({
    errors: [{ message: 'Something went wrong' }],
  });
};
