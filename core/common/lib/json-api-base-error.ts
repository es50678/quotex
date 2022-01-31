import { ErrorOptions, JapiError } from 'ts-japi';

export class JsonApiBaseError extends Error {
  statusCode: number | string;
  errors: JapiError[];

  constructor(message: string, statusCode: number | string) {
    super(message);
    this.statusCode = statusCode;
    this.errors = [];
  }

  addJapiError(error: ErrorOptions) {
    this.errors.push(new JapiError(error));
  }

  addError(..._args: unknown[]) {
    throw new Error('Method must be implemented in subclass');
  }
}
