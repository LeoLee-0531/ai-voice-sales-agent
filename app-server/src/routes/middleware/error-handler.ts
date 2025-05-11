import {
  BadRequestError,
  ErrorCodes,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  createErrorResponse,
} from '@/routes/dto/response'
import { AxiosError } from 'axios'
import type { NextFunction, Request, Response } from 'express'
import { error as ValidatorError } from 'express-openapi-validator'
import { StatusCodes } from 'http-status-codes'

type ErrorHandlerConfig = {
  check: (err: Error) => boolean
  status: number
  errorCode: ErrorCodes
  message: (err: Error) => string
}

const errorHandlers: ErrorHandlerConfig[] = [
  {
    check: (err) => err instanceof AxiosError,
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    errorCode: ErrorCodes.INTERNAL_SERVER_ERROR,
    message: (err) => {
      const axiosErr = err as AxiosError
      return `Failed to call external service, status: ${axiosErr?.response?.status}, message: ${axiosErr.message}`
    },
  },
  {
    check: (err) =>
      err instanceof BadRequestError ||
      err instanceof ValidatorError.BadRequest,
    status: StatusCodes.BAD_REQUEST,
    errorCode: ErrorCodes.BAD_REQUEST,
    message: (err) => `Bad request, message: ${err.message}`,
  },
  {
    check: (err) =>
      err instanceof UnauthorizedError ||
      err instanceof ValidatorError.Unauthorized,
    status: StatusCodes.UNAUTHORIZED,
    errorCode: ErrorCodes.UNAUTHORIZED,
    message: (err) => `Unauthorized, message: ${err.message}`,
  },
  {
    check: (err) =>
      err instanceof ForbiddenError || err instanceof ValidatorError.Forbidden,
    status: StatusCodes.FORBIDDEN,
    errorCode: ErrorCodes.FORBIDDEN,
    message: (err) => `Forbidden, message: ${err.message}`,
  },
  {
    check: (err) =>
      err instanceof NotFoundError || err instanceof ValidatorError.NotFound,
    status: StatusCodes.NOT_FOUND,
    errorCode: ErrorCodes.NOT_FOUND,
    message: (err) => `Not found, message: ${err.message}`,
  },
]

class GlobalErrorHandler {
  handleError = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    for (const handler of errorHandlers) {
      if (handler.check(err)) {
        res
          .status(handler.status)
          .send(createErrorResponse(handler.errorCode, handler.message(err)))
        return
      }
    }

    console.error(err)

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(
        createErrorResponse(
          ErrorCodes.INTERNAL_SERVER_ERROR,
          'Internal server error'
        )
      )
    next()
  }
}

export const errorHandler = new GlobalErrorHandler()

export function handleExpressHandlerError<
  P = unknown,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = unknown,
>(
  handler: (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response
  ) => Promise<void>
) {
  return async (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await handler(req, res)
    } catch (err) {
      next(err)
    }
  }
}
