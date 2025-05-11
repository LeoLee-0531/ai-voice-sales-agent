export enum ErrorCodes {
  INTERNAL_SERVER_ERROR = 500,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
}

interface ResponseError {
  code: ErrorCodes
  message: string
}

interface Response<T> {
  success: boolean
  result?: T
  error?: ResponseError
}

export class BaseError extends Error {
  constructor(
    public code: ErrorCodes,
    message: string
  ) {
    super(message)
  }
}

export class InternalServerError extends BaseError {
  constructor(message: string) {
    super(ErrorCodes.INTERNAL_SERVER_ERROR, message)
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string) {
    super(ErrorCodes.BAD_REQUEST, message)
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(ErrorCodes.UNAUTHORIZED, message)
  }
}

export class ForbiddenError extends BaseError {
  constructor(message: string) {
    super(ErrorCodes.FORBIDDEN, message)
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(ErrorCodes.NOT_FOUND, message)
  }
}

export function createSuccessResponse<T>(result?: T): Response<T> {
  return {
    success: true,
    result,
  }
}

export function createErrorResponse(
  code: ErrorCodes,
  message: string
): Response<never> {
  return {
    success: false,
    error: {
      code,
      message,
    },
  }
}
