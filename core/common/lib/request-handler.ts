import { APIGatewayProxyEvent } from 'aws-lambda';
import { JapiBadRequestError, JapiNotAcceptableError, JapiUnsupportedMediaTypeError } from './japi-custom-errors';

export class RequestHandler {
  static jsonApiMimePattern = /^application\/vnd(.api\+)?json(;.*)?$/;

  handle(_event: APIGatewayProxyEvent) {
    throw new Error('Method must be implemented in subclass');
  }

  getParsedBody<T>(event: APIGatewayProxyEvent): T {
    let body = event.body;

    if (!body) {
      throw new JapiBadRequestError('Request body is empty');
    }

    if (event.isBase64Encoded) {
      body = Buffer.from(body, 'base64').toString('utf-8');
    }

    return this.parseBody<T>(body);
  }

  parseBody<T = Record<string, unknown>>(eventBody: string): T {
    try {
      return JSON.parse(eventBody) as T;
    } catch (e) {
      throw new JapiBadRequestError('Unable to parse request body');
    }
  }

  validateContentTypeHeaderValue(headerValue: string) {
    if (!RequestHandler.jsonApiMimePattern.test(headerValue)) {
      throw new JapiUnsupportedMediaTypeError(`Content-Type header(${headerValue}) is unsupported`);
    }
  }

  validateContentTypeHeaderExists(event: APIGatewayProxyEvent) {
    if (!event.headers['content-type']) throw new JapiUnsupportedMediaTypeError('Content-Type header does not exist');
  }

  validateAcceptHeaderValue(headerValue: string) {
    if (!RequestHandler.jsonApiMimePattern.test(headerValue)) {
      throw new JapiNotAcceptableError(`Accept header(${headerValue}) is unsupported`);
    }
  }

  validateAcceptHeaderExists(event: APIGatewayProxyEvent) {
    if (!event.headers['accept']) throw new JapiNotAcceptableError('Accept header does not exist');
  }

  validateContentTypeHeader(event: APIGatewayProxyEvent) {
    this.validateContentTypeHeaderExists(event);
    this.validateContentTypeHeaderValue(event.headers['content-type'] as string);
  }

  validateAcceptHeader(event: APIGatewayProxyEvent) {
    this.validateAcceptHeaderExists(event);
    this.validateAcceptHeaderValue(event.headers['accept'] as string);
  }
}
