'use client';

import { useState } from 'react';
import { X, Star } from 'lucide-react';
import { reviewsAPI } from '@/lib/api';
import { useToast } from '@/context/ToastContext';

export default function ReviewModal({ gem, onClose, onDone }) {
  const { toast } = useToast();
  const [rating, setRating]   = useState(5);
  const [hover, setHover]     = useState(0);
  const [title, setTitle]     = useState('');
  const [comment, setComment] = useState('');
  const [busy, setBusy]       = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !comment.trim()) {
      toast('Please add a title and a comment', 'error');
      return;
    }
    setBusy(true);
    try {
      await reviewsAPI.create({ gemId: gem.id, rating, title, comment });
      toast('Your review has been submitted', 'success');
      onDone?.(gem.id);
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || 'Could not submit review.';
      toast(Array.isArray(msg) ? msg[0] : msg, 'error');
    } finally {
      setBusy(false);
    }
  };

  const inputCls = 'w-full px-4 py-2.5 bg-obsidian-900 text-pearl-100 border border-gold-900/30 rounded-sm text-sm placeholder:text-pearl-700 focus:outline-none focus:border-gold-700/60 transition-colors';

  return (
    <div
      className="fixed inset-0 z-[80] bg-obsidian-950/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="luxury-card w-full max-w-md p-7 shadow-luxury"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="section-label mb-1">Share Your Experience</p>
            <h2 className="font-display text-2xl font-light text-pearl-50"
              style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
              Review {gem.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 text-pearl-600 hover:text-gold-400 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {/* Star Rating */}
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-pearl-600 mb-2">Rating</p>
            <div className="flex gap-1.5" role="radiogroup" aria-label="Rating">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  onMouseEnter={() => setHover(n)}
                  onMouseLeave={() => setHover(0)}
                  aria-label={`${n} star${n > 1 ? 's' : ''}`}
                  aria-checked={rating === n}
                  role="radio"
                >
                  <Star
                    size={26}
                    className={(hover || rating) >= n
                      ? 'text-gold-500 fill-gold-500 transition-colors'
                      : 'text-pearl-700 transition-colors'}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-widest uppercase text-pearl-600 mb-1.5 block">Title</label>
            <input
              className={inputCls}
              placeholder="Summarise your experience"
              value={title}
              maxLength={150}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-widest uppercase text-pearl-600 mb-1.5 block">Review</label>
            <textarea
              className={`${inputCls} min-h-[110px] resize-none`}
              placeholder="Describe the gem quality, presentation, and delivery experience"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="btn-gold w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {busy ? 'Submitting…' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
}
