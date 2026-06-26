/**
 * Maps API errors to friendly, human-readable messages.
 * Never surface raw status codes or stack traces to end users.
 */

const STATUS_MESSAGES = {
  400: 'The information you provided looks incorrect. Please check and try again.',
  401: 'Your session has expired. Please sign in again to continue.',
  403: "You don't have permission to do that. If this seems wrong, please contact support.",
  404: "We couldn't find what you were looking for. It may have been moved or removed.",
  409: 'This action conflicts with existing data — for example, an email already in use.',
  422: 'Some of the details you entered are invalid. Please review and try again.',
  429: "You've made too many requests. Please wait a moment and try again.",
  500: 'Something went wrong on our end. Our team has been notified. Please try again shortly.',
  502: 'Our service is temporarily unavailable. Please try again in a few minutes.',
  503: 'We are undergoing maintenance. Please check back shortly.',
  504: 'The request took too long. Please check your connection and try again.',
};

const FIELD_HINTS = {
  email:    'Make sure your email address is correctly formatted (e.g. you@example.com).',
  password: 'Your password must be at least 8 characters long.',
  firstName:'Please enter your first name.',
  lastName: 'Please enter your last name.',
};

/**
 * Returns a friendly error string from an Axios error or unknown value.
 * @param {unknown} err - The caught error
 * @param {string}  [fallback] - Shown when nothing more specific is available
 */
export function friendlyError(err, fallback = 'Something went wrong. Please try again.') {
  if (!err) return fallback;

  const status  = err?.response?.status;
  const data    = err?.response?.data;
  const message = data?.message;

  // Server sent a human-readable message array (NestJS validation pipe)
  if (Array.isArray(message) && message.length > 0) {
    return humaniseValidationMessages(message);
  }

  // Server sent a plain string message
  if (typeof message === 'string' && message.length > 0 && !looksLikeTechnical(message)) {
    return message;
  }

  // Map by HTTP status code
  if (status && STATUS_MESSAGES[status]) {
    return STATUS_MESSAGES[status];
  }

  // Network / timeout
  if (err?.code === 'ECONNABORTED' || err?.message?.includes('timeout')) {
    return 'The request took too long. Please check your internet connection and try again.';
  }
  if (err?.code === 'ERR_NETWORK' || !navigator?.onLine) {
    return 'No internet connection. Please check your network and try again.';
  }

  return fallback;
}

function humaniseValidationMessages(messages) {
  const first = messages[0];
  // Try to find a field hint
  for (const [field, hint] of Object.entries(FIELD_HINTS)) {
    if (first.toLowerCase().includes(field)) return hint;
  }
  // Clean up NestJS constraint messages like "email must be an email"
  const cleaned = first.replace(/^[a-z]+\s+/, '').replace(/\b(must be|should be)\b/i, 'should be');
  return capitalise(cleaned) + (cleaned.endsWith('.') ? '' : '.');
}

function looksLikeTechnical(msg) {
  return /\b(sql|stack|trace|exception|error code|syntax|undefined|null|NaN)\b/i.test(msg);
}

function capitalise(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
