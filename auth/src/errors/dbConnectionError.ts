import { CustomError } from './customError';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = 'Error connecting to database';

  constructor() {
    super('Error connecting to DB');

    Object.setPrototypeOf(this, DatabaseConnectionError);
  }

  serializeError() {
    return [{ message: this.reason }];
  }
}
