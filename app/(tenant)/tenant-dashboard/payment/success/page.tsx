// app/payment/success/page.tsx
import { verifyPayment } from "../../_actions/paymentAction";
import { CheckCircle2, XCircle, Home } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import ReviewForm from "./_components/ReviewForm";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{
    session_id?: string;
    rental_id?: string;
    property_id?: string;
  }>;
}) {
  const { session_id, rental_id, property_id } = await searchParams;
  const cookieStore = await cookies();
  const fallbackPropertyId = cookieStore.get(
    "pending_review_property_id",
  )?.value;
  const resolvedPropertyId = property_id ?? fallbackPropertyId;

  if (!session_id || !rental_id) {
    return (
      <ErrorState message="Invalid payment session. Missing parameters." />
    );
  }

  const result = await verifyPayment(session_id, rental_id);

  if (!result.ok) {
    return (
      <ErrorState message={result.message || "Payment verification failed."} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
        {/* Success Banner */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8 text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-emerald-100 rounded-full p-5">
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Payment Successful!
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Your rental payment has been processed. Your lease is now active.
            </p>
          </div>

          {/* Receipt */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-left space-y-2.5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Receipt
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Status</span>
              <span className="font-semibold text-emerald-600">
                Completed ✓
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Session ID</span>
              <span className="font-mono text-xs text-gray-600 truncate max-w-[200px]">
                {session_id}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Rental ID</span>
              <span className="font-mono text-xs text-gray-600 truncate max-w-[200px]">
                {rental_id}
              </span>
            </div>
          </div>

          <Link
            href="/tenant-dashboard"
            className="inline-flex items-center justify-center gap-2 bg-[#123832] hover:bg-[#0e2c27] text-white font-semibold py-3 px-6 rounded-xl transition-colors w-full"
          >
            <Home className="w-4 h-4" />
            Go to Dashboard
          </Link>
        </div>

        {/* Review Form */}
        {resolvedPropertyId && <ReviewForm propertyId={resolvedPropertyId} />}

        {/* Skip link */}
        <p className="text-center text-sm text-gray-400">
          You can also leave a review later from your{" "}
          <Link
            href="/tenant-dashboard"
            className="text-[#123832] underline underline-offset-2"
          >
            dashboard
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-10 w-full max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-red-100 rounded-full p-5">
            <XCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Failed</h1>
          <p className="text-gray-500 text-sm mt-2">{message}</p>
        </div>
        <Link
          href="/tenant-dashboard"
          className="flex items-center justify-center gap-2 bg-[#123832] hover:bg-[#0e2c27] text-white font-semibold py-3 rounded-xl transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
