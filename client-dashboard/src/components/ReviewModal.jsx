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

  const inputCls = 'w-full px-4 py-2.5 bg-slate-50 text-slate-800 border border-slate-200 rounded-sm text-sm placeholder:text-slate-300 focus:outline-none focus:border-royal-400 transition-colors';

  return (
    <div
      className="fixed inset-0 z-[80] bg-white/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="luxury-card w-full max-w-md p-7 shadow-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="section-label mb-1">Share Your Experience</p>
            <h2 className="text-xl font-bold text-slate-900">
              Review {gem.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 text-slate-400 hover:text-royal-500 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {/* Star Rating */}
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-2">Rating</p>
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
                      ? 'text-royal-600 fill-gold-500 transition-colors'
                      : 'text-slate-300 transition-colors'}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1.5 block">Title</label>
            <input
              className={inputCls}
              placeholder="Summarise your experience"
              value={title}
              maxLength={150}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1.5 block">Review</label>
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
