import { JsonApiBaseError } from './json-api-base-error';
import { ErrorOptions } from 'ts-japi';

export class JsonApiBadRequestError extends JsonApiBaseError {
  constructor() {
    super('Bad Request Error', 400);
  }

  addError(error: Required<Pick<ErrorOptions, 'title' | 'detail'>>) {
    this.addJapiError({
      status: this.statusCode,
      code: 'bad_request',
      title: error.title,
      detail: error.detail,
    });
  }
}
