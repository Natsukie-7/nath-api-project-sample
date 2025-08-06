export interface HttpErrorOptions {
  message?: string;
  statusCode?: number;
}

export default class HttpError extends Error {
  statusCode: number;

  constructor({
    message = 'Error on request',
    statusCode = 400,
  }: HttpErrorOptions) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
