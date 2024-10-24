export class APIError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    // for stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}
