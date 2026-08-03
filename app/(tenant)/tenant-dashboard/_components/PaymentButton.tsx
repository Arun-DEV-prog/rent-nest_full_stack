// app/tenant-dashboard/_components/PaymentButton.tsx
"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createPaymentCheckout } from "../_actions/paymentAction";

export default function PaymentButton({ propertyId }: { propertyId: string }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    const toastId = toast.loading("Preparing payment...");

    const result = await createPaymentCheckout(propertyId);

    if (!result.ok || !result.data) {
      toast.error(result.message || "Failed to initiate payment.", {
        id: toastId,
      });
      setLoading(false);
      return;
    }

    toast.success("Redirecting to Stripe...", { id: toastId });

    // Append property_id to success URL so review form gets it
    const checkoutUrl = new URL(result.data.checkoutUrl);
    // Note: Stripe doesn't allow modifying their checkout URL.
    // Instead, store propertyId in the success_url on the backend:
    // success_url: `.../payment/success?session_id={CHECKOUT_SESSION_ID}&rental_id=${rentalId}&property_id=${propertyId}`
    window.location.href = checkoutUrl.toString();
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <CreditCard className="w-4 h-4" />
      )}
      {loading ? "Processing..." : "Pay Now"}
    </button>
  );
}
