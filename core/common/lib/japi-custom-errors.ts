import { JapiError } from 'ts-japi';

export class JapiBadRequestError extends JapiError {
  constructor(message?: string) {
    super({
      status: 400,
      code: 'bad_request',
      title: 'Bad Request',
      detail: message || 'Bad Request',
    });
  }
}

export class JapiUnsupportedMediaTypeError extends JapiError {
  constructor(message?: string) {
    super({
      status: 403,
      code: 'unsupported_media_type',
      title: 'Unsupported Media Type',
      detail: message || 'Unsupported Media Type',
    });
  }
}

export class JapiNotAcceptableError extends JapiError {
  constructor(message?: string) {
    super({
      status: 406,
      code: 'not_acceptable',
      title: 'Not Acceptable',
      detail: message || 'Accept header is not acceptable',
    });
  }
}
