import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

/**
 * Catches every unhandled error and renders a single, consistent error
 * contract. Internal (500) errors are logged with their stack but never
 * leak implementation details to the client.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionFilter');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | string[] = 'Internal server error';
    let error = 'InternalServerError';

    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
      } else if (res && typeof res === 'object') {
        message = (res as any).message ?? exception.message;
        error = (res as any).error ?? exception.name;
      }
    }

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      // Log the real cause server-side, return a safe generic message.
      this.logger.error(
        `${request?.method} ${request?.url} -> ${status}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
      message = 'Internal server error';
      error = 'InternalServerError';
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      error,
      message,
      path: request?.url,
      timestamp: new Date().toISOString(),
    });
  }
}
