import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Normalises successful responses into a symmetric envelope that mirrors the
 * AllExceptionsFilter error contract: `{ success, message, data, timestamp }`.
 *
 * It is intentionally conservative — only payloads that already look like our
 * `{ message, data }` envelope are enriched. Probe endpoints (health/root) and
 * any other raw payloads pass through unchanged so existing infra keeps working.
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((payload) => {
        const isEnvelope =
          payload &&
          typeof payload === 'object' &&
          !Array.isArray(payload) &&
          ('data' in payload || 'message' in payload) &&
          !('success' in payload);

        if (!isEnvelope) return payload;

        return {
          success: true,
          ...payload,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
