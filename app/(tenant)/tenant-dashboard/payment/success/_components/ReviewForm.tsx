// app/payment/success/_components/ReviewForm.tsx
"use client";

import { useState } from "react";
import { Star, Send, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { submitReview } from "../../../_actions/reviewAction";

export default function ReviewForm({ propertyId }: { propertyId: string }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ratingLabels: Record<number, string> = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }
    if (comment.trim().length < 10) {
      setError("Please write at least 10 characters.");
      return;
    }

    setError(null);
    setSubmitting(true);
    const toastId = toast.loading("Submitting review...");

    const result = await submitReview({ propertyId, rating, comment });

    if (!result.ok) {
      toast.error(result.message || "Failed to submit review.", {
        id: toastId,
      });
      setError(result.message || "Failed to submit review.");
    } else {
      toast.success("Review submitted! Thank you.", { id: toastId });
      setSubmitted(true);
    }

    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8 text-center space-y-3">
        <div className="flex justify-center">
          <div className="bg-blue-100 rounded-full p-4">
            <CheckCircle2 className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-900">
          Thank you for your review!
        </h3>
        <p className="text-sm text-gray-500">
          Your feedback helps other tenants find great properties.
        </p>
        <div className="flex justify-center gap-1 pt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900">Leave a Review</h2>
        <p className="text-sm text-gray-500 mt-1">
          How was your experience with this property?
        </p>
      </div>

      {/* Star Rating */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-10 h-10 transition-colors ${
                  star <= (hovered || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-200 fill-gray-200"
                }`}
              />
            </button>
          ))}
        </div>
        <p
          className={`text-sm font-semibold transition-opacity ${
            hovered || rating ? "opacity-100" : "opacity-0"
          } ${
            (hovered || rating) >= 4
              ? "text-emerald-600"
              : (hovered || rating) >= 3
                ? "text-blue-600"
                : "text-orange-500"
          }`}
        >
          {ratingLabels[hovered || rating] ?? ""}
        </p>
      </div>

      {/* Comment */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">
          Your Review <span className="text-red-500">*</span>
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="Share your experience — location, cleanliness, landlord responsiveness..."
          className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#123832] focus:ring-2 focus:ring-[#123832]/10 transition resize-none"
        />
        <div className="flex items-center justify-between">
          {error ? <p className="text-xs text-red-500">{error}</p> : <span />}
          <p
            className={`text-xs ml-auto ${
              comment.length < 10 ? "text-gray-400" : "text-emerald-600"
            }`}
          >
            {comment.length} / 500
          </p>
        </div>
      </div>

      {/* Checklist hints */}
      <div className="grid grid-cols-2 gap-2">
        {[
          "Location",
          "Cleanliness",
          "Value for money",
          "Landlord communication",
        ].map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => {
              if (!comment.includes(tag)) {
                setComment((prev) => (prev ? `${prev}, ${tag}` : tag));
              }
            }}
            className="text-xs border border-gray-200 rounded-full px-3 py-1.5 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition text-left"
          >
            + {tag}
          </button>
        ))}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={submitting || rating === 0}
        className="w-full flex items-center justify-center gap-2 bg-[#123832] hover:bg-[#0e2c27] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
      >
        {submitting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
}
