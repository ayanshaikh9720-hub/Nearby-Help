import React, { useState } from 'react';
import { X, Star, ThumbsUp, Check, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface RatingReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string | null;
  targetRole?: 'provider' | 'customer';
}

export const RatingReviewModal: React.FC<RatingReviewModalProps> = ({
  isOpen,
  onClose,
  bookingId,
  targetRole = 'provider'
}) => {
  const { bookings, profile, addReview, userMode } = useApp();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !bookingId) return null;

  const booking = bookings.find(b => b.id === bookingId);
  const isCustomerReviewing = targetRole === 'provider';

  const providerTags = [
    'Punctual',
    'Fair Pricing',
    'Clean Work',
    'Courteous',
    'Expert Troubleshooting',
    'Carried All Tools'
  ];

  const customerTags = [
    'Clear Directions',
    'Quick OTP Share',
    'Immediate Payment',
    'Respectful',
    'Safe Workspace'
  ];

  const availableTags = isCustomerReviewing ? providerTags : customerTags;

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking) return;

    addReview({
      bookingId: booking.id,
      authorId: profile.id,
      authorName: profile.name,
      authorRole: userMode === 'provider' ? 'provider' : 'customer',
      targetId: isCustomerReviewing ? booking.providerId : booking.customerId,
      targetName: isCustomerReviewing ? booking.providerName : booking.customerName,
      rating,
      tags: selectedTags,
      comment: comment.trim() || 'Service completed as expected.'
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-extrabold text-base text-slate-900 leading-tight">
              {isCustomerReviewing ? 'Rate Your Service Partner' : 'Rate Customer Experience'}
            </h2>
            <p className="text-xs text-slate-600">
              {isCustomerReviewing ? booking?.providerName : booking?.customerName} · {booking?.service}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {submitted ? (
            <div className="text-center py-8 space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Feedback Submitted!</h3>
              <p className="text-xs text-slate-600">
                Your rating helps maintain high standards and mutual trust in the community.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star Rating Selector */}
              <div className="text-center py-2">
                <span className="text-xs font-semibold text-slate-600 block mb-2">
                  Select Rating (1 to 5 Stars):
                </span>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1.5 focus:outline-none transition-transform active:scale-125"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          (hoverRating || rating) >= star
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-slate-200 fill-slate-100'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs font-bold text-amber-800 mt-1 block">
                  {rating === 5 ? 'Excellent 5/5' : rating === 4 ? 'Good 4/5' : rating === 3 ? 'Average 3/5' : rating === 2 ? 'Below Expectations 2/5' : 'Poor 1/5'}
                </span>
              </div>

              {/* Tag Highlights */}
              <div>
                <span className="text-xs font-bold text-slate-800 block mb-1.5">
                  What went well?
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {availableTags.map(tag => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-amber-100 border-amber-300 text-amber-900 font-semibold'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {isSelected && '✓ '}
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Written feedback */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Written Feedback:
                </label>
                <textarea
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  rows={3}
                  placeholder={
                    isCustomerReviewing
                      ? 'Share specific details about quality, timeliness, and behavior...'
                      : 'Help other service providers understand how smooth the interaction was...'
                  }
                  className="w-full text-xs rounded-xl border border-slate-200 p-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  Submit Mutual Rating
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
