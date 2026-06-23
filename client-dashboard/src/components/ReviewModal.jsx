'use client';

import { useState } from 'react';
import { X, Star } from 'lucide-react';
import { reviewsAPI } from '@/lib/api';
import { useToast } from '@/context/ToastContext';
import Button from '@/components/ui/Button';

export default function ReviewModal({ gem, onClose, onDone }) {
  const { toast } = useToast();
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !comment.trim()) {
      toast('Please add a title and a comment', 'error');
      return;
    }
    setBusy(true);
    try {
      await reviewsAPI.create({ gemId: gem.id, rating, title, comment });
      toast('Thanks for your review!', 'success');
      onDone?.(gem.id);
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || 'Could not submit review.';
      toast(Array.isArray(msg) ? msg[0] : msg, 'error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-900 rounded-2xl w-full max-w-md p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Review {gem.name}</h2>
          <button onClick={onClose} aria-label="Close"><X className="text-slate-400 hover:text-white" /></button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div className="flex gap-1" role="radiogroup" aria-label="Rating">
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
                  size={28}
                  className={(hover || rating) >= n ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}
                />
              </button>
            ))}
          </div>
          <input
            className="w-full rounded-lg px-3 py-2 bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="Review title"
            value={title}
            maxLength={150}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full rounded-lg px-3 py-2 bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 min-h-[100px]"
            placeholder="Share your experience with this gem"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button type="submit" loading={busy} className="w-full">Submit Review</Button>
        </form>
      </div>
    </div>
  );
}
