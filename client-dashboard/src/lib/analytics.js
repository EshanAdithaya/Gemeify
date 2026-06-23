import api from '@/lib/api';

// Stable per-browser session id so events can be grouped without auth.
function sessionId() {
  if (typeof window === 'undefined') return undefined;
  let id = localStorage.getItem('gemify:sid');
  if (!id) {
    id = (crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`);
    localStorage.setItem('gemify:sid', id);
  }
  return id;
}

/**
 * Fire-and-forget analytics. Never throws and never blocks the UI — failures
 * (e.g. backend offline) are swallowed. eventType/eventCategory must match the
 * backend enums.
 */
export function track(eventType, eventCategory, eventName, properties = {}) {
  try {
    api
      .post('/analytics/track', {
        eventType,
        eventCategory,
        eventName,
        sessionId: sessionId(),
        properties: { ...properties, url: typeof window !== 'undefined' ? window.location.pathname : undefined },
      })
      .catch(() => {});
  } catch {
    /* ignore */
  }
}

export const Events = {
  pageLoad: (page) => track('page_load', 'performance', 'Page Load', { page }),
  gemViewed: (gemId) => track('gem_viewed', 'gem', 'Gem Viewed', { gemId }),
  wishlistAdded: (gemId) => track('gem_added_to_wishlist', 'gem', 'Gem Added To Wishlist', { gemId }),
  searchPerformed: (searchQuery) => track('search_performed', 'search', 'Search Performed', { searchQuery }),
  orderCreated: (orderId, amount) =>
    track('order_created', 'order', 'Order Created', { orderId, amount, currency: 'USD' }),
};
