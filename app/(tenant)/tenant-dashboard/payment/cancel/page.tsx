// app/payment/cancel/page.tsx
import { handlePaymentCancel } from "../../_actions/paymentAction";
import { XCircle, Home, RotateCcw } from "lucide-react";
import Link from "next/link";

export default async function PaymentCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ rental_id?: string }>;
}) {
  const { rental_id } = await searchParams;
  const result = await handlePaymentCancel({ rentalId: rental_id });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-10 w-full max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-orange-100 rounded-full p-5">
            <XCircle className="w-12 h-12 text-orange-500" />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Payment Cancelled
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            {result.message ||
              "You cancelled the payment. Your rental request is still approved — you can retry anytime."}
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <Link
            href="/tenant-dashboard"
            className="flex items-center justify-center gap-2 bg-[#123832] hover:bg-[#0e2c27] text-white font-semibold py-3 rounded-xl transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-xl transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
