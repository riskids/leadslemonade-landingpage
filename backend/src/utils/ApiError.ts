/**
 * Application-level error carrying an HTTP status code and optional
 * structured error list. Thrown inside services/controllers and
 * translated by the global error handler into the error envelope.
 */
export class ApiError extends Error {
  readonly statusCode: number;
  readonly errors?: string[];

  constructor(statusCode: number, message: string, errors?: string[]) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errors = errors;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static badRequest(message = "Bad request", errors?: string[]) {
    return new ApiError(400, message, errors);
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiError(401, message);
  }

  static notFound(message = "Resource not found") {
    return new ApiError(404, message);
  }

  static conflict(message = "Resource already exists", errors?: string[]) {
    return new ApiError(409, message, errors);
  }

  static internal(message = "Internal server error") {
    return new ApiError(500, message);
  }
}
