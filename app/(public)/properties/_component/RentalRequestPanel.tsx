// app/properties/[id]/_components/RentalRequestPanel.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CalendarDays, Clock, Send, LogIn, X, Loader2 } from "lucide-react";

import { submitRentalRequest } from "../../_actions/rentalRequestAction";
import type { PublicProperty } from "../../_actions/publicPropertiesAction";

const requestSchema = z.object({
  move_in_date: z.string().min(1, "Move-in date is required"),
  lease_duration: z.string().min(1, "Lease duration is required"),
});

type RequestFormData = z.infer<typeof requestSchema>;

const leaseDurations = [
  "1 month",
  "3 month",
  "6 month",
  "12 month",
  "24 month",
];

export default function RentalRequestPanel({
  property,
  isLoggedIn,
}: {
  property: PublicProperty;
  isLoggedIn: boolean;
}) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
  });

  const handleLoginRedirect = () => {
    toast.error("Please log in to submit a rental request.");
    router.push("/login");
  };

  const onSubmit = async (data: RequestFormData) => {
    setSubmitting(true);
    const toastId = toast.loading("Sending request...");

    const result = await submitRentalRequest({
      propertisId: property.id,
      move_in_date: data.move_in_date,
      lease_duration: data.lease_duration,
    });

    if (!result.ok) {
      toast.error(result.message || "Failed to send request.", { id: toastId });
      if (result.unauthorized) {
        handleLoginRedirect();
      }
    } else {
      toast.success("Rental request sent successfully!", { id: toastId });
      reset();
      setShowForm(false);
    }

    setSubmitting(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Rent */}
      <div className="p-5 border-b border-gray-100">
        <p className="text-3xl font-bold text-blue-600">
          ৳{Number(property.rent).toLocaleString()}
        </p>
        <p className="text-sm text-gray-400">per month</p>
      </div>

      <div className="p-5 space-y-4">
        {!showForm ? (
          <>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-gray-400" />
                Available from{" "}
                {new Date(property.available_from).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>

            {isLoggedIn ? (
              <button
                onClick={() => setShowForm(true)}
                disabled={!property.availability}
                className="w-full flex items-center justify-center gap-2 bg-[#123832] hover:bg-[#0e2c27] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-colors"
              >
                <Send className="w-4 h-4" />
                {property.availability
                  ? "Send Rental Request"
                  : "Not Available"}
              </button>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 text-center">
                  You must be logged in to send a rental request.
                </p>
                <button
                  type="button"
                  onClick={handleLoginRedirect}
                  className="w-full flex items-center justify-center gap-2 bg-[#123832] hover:bg-[#0e2c27] text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Login to Request
                </button>
              </div>
            )}
          </>
        ) : (
          /* Request Form */
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-gray-900 text-sm">
                Rental Request
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  reset();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Move-in Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5" />
                Move-in Date
              </label>
              <input
                type="date"
                {...register("move_in_date")}
                min={new Date().toISOString().split("T")[0]}
                className="w-full h-10 rounded-xl border border-gray-200 px-3 text-sm text-gray-900 outline-none focus:border-[#123832] focus:ring-2 focus:ring-[#123832]/10 transition"
              />
              {errors.move_in_date && (
                <p className="text-xs text-red-500">
                  {errors.move_in_date.message}
                </p>
              )}
            </div>

            {/* Lease Duration */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Lease Duration
              </label>
              <select
                {...register("lease_duration")}
                className="w-full h-10 rounded-xl border border-gray-200 px-3 text-sm text-gray-900 outline-none focus:border-[#123832] focus:ring-2 focus:ring-[#123832]/10 transition bg-white"
              >
                <option value="">Select duration</option>
                {leaseDurations.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {errors.lease_duration && (
                <p className="text-xs text-red-500">
                  {errors.lease_duration.message}
                </p>
              )}
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-500 space-y-1 border border-gray-100">
              <p className="font-medium text-gray-700">Request Summary</p>
              <p>
                Property:{" "}
                <span className="text-gray-800">{property.title}</span>
              </p>
              <p>
                Rent:{" "}
                <span className="text-blue-600 font-semibold">
                  ৳{Number(property.rent).toLocaleString()}/mo
                </span>
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 bg-[#123832] hover:bg-[#0e2c27] disabled:opacity-60 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {submitting ? "Sending..." : "Submit Request"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
