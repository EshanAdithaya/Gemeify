import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, url, body, query, params, headers } = request;
    const userAgent = headers['user-agent'] || '';
    const ip = headers['x-forwarded-for'] || request.connection.remoteAddress;

    const now = Date.now();

    console.log(`🚀 [${new Date().toISOString()}] ${method} ${url}`);
    console.log(`📍 IP: ${ip} | User-Agent: ${userAgent.substring(0, 100)}...`);
    
    if (Object.keys(query).length > 0) {
      console.log(`🔍 Query:`, query);
    }
    
    if (Object.keys(params).length > 0) {
      console.log(`📎 Params:`, params);
    }
    
    // Log body but exclude sensitive data
    if (body && Object.keys(body).length > 0) {
      const sanitizedBody = { ...body };
      if (sanitizedBody.password) sanitizedBody.password = '***';
      if (sanitizedBody.currentPassword) sanitizedBody.currentPassword = '***';
      if (sanitizedBody.newPassword) sanitizedBody.newPassword = '***';
      console.log(`📦 Body:`, sanitizedBody);
    }

    return next.handle().pipe(
      tap({
        next: (data) => {
          const duration = Date.now() - now;
          console.log(`✅ [${new Date().toISOString()}] ${method} ${url} - ${response.statusCode} - ${duration}ms`);
          
          if (data && typeof data === 'object') {
            console.log(`📤 Response:`, {
              message: data.message,
              dataCount: data.data ? (Array.isArray(data.data) ? data.data.length : 'object') : 'none'
            });
          }
        },
        error: (error) => {
          const duration = Date.now() - now;
          console.error(`❌ [${new Date().toISOString()}] ${method} ${url} - ERROR - ${duration}ms`);
          console.error(`🔥 Error:`, {
            message: error.message,
            status: error.status,
            stack: error.stack?.substring(0, 200) + '...'
          });
        }
      })
    );
  }
}