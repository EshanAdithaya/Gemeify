import { Request, Response, NextFunction } from 'express';

/**
 * Adds a baseline set of defensive HTTP headers without pulling in a
 * third-party dependency. Implemented as functional middleware so it can be
 * registered via `app.use()` and avoids router path-matching entirely.
 */
export function securityHeaders(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '0');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  res.removeHeader('X-Powered-By');
  next();
}
