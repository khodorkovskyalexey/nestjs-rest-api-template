import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { DUBLICATE_KEY_VALUE } from './common/constants/database-exceptions';

@Catch(QueryFailedError)
export class ConflictExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = exception.status || 500;
    let message = exception.message || '';

    if (exception.code === DUBLICATE_KEY_VALUE.code) {
      status = DUBLICATE_KEY_VALUE.status;
      message = exception.detail || DUBLICATE_KEY_VALUE.defaultMessage;
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      error: 'Conflict',
    });
  }
}
