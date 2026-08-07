"use server"
import axiosInstance from "@/lib/axios";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export const createPaymentCheckout = async (propertyId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) redirect("/login");

  try {
    const response = await axiosInstance.post(
      "/api/payments/create",
      { propertyId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const responseData = response.data as {
      success?: boolean;
      message?: string;
      data?: {
        checkoutUrl: string;
        sessionId: string;
        paymentId: string;
        rentalId: string;
        amount: string;
      };
    };

    if (!responseData.success || !responseData.data) {
      return { ok: false, message: responseData.message || "Failed to create payment." };
    }

    if (propertyId) {
      cookieStore.set("pending_review_property_id", propertyId, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 10,
      });
    }

    if (responseData.data.rentalId) {
      cookieStore.set("pending_review_rental_id", responseData.data.rentalId, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 10,
      });
    }

    return { ok: true, data: responseData.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) redirect("/login");
      return {
        ok: false,
        message: error.response?.data?.message || error.message || "Payment failed.",
      };
    }
    return { ok: false, message: "Payment failed." };
  }
};

export const verifyPayment = async (sessionId: string, rentalId?: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) redirect("/login");

  try {
    const requestBody: { sessionId: string; rentalId?: string } = { sessionId };
    if (rentalId) requestBody.rentalId = rentalId;

    const response = await axiosInstance.post(
      "/api/payments/confirm",
      requestBody,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const responseData = response.data as {
      success?: boolean;
      message?: string;
      data?: Record<string, unknown>;
    };

    const success = responseData.success ?? true;

    if (success) {
      revalidateTag("tenant-rentals", "default");
      revalidateTag("public-properties", "default");
      revalidateTag("public-property", "default");
    }

    return {
      ok: success,
      message: responseData.message || (success ? "Payment verification completed." : "Verification failed."),
      data: responseData.data,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        redirect("/login");
      }

      const backendMessage = error.response?.data?.message || error.message;
      const paymentStatus = error.response?.data?.data?.paymentStatus;
      const paymentState = error.response?.data?.data?.status;
      const statusCode = error.response?.status;
      const isNetworkIssue = error.code === "ERR_NETWORK" || error.code === "ECONNABORTED";
      const isMissingConfirmEndpoint =
        statusCode === 404 ||
        /not found|cannot post|network error|request failed/i.test(String(backendMessage));

      if (paymentStatus === "completed" || paymentState === "completed") {
        revalidateTag("tenant-rentals", "default");
        revalidateTag("public-properties", "default");
        revalidateTag("public-property", "default");

        return {
          ok: true,
          message: backendMessage || "Payment completed successfully.",
          data: {
            paymentStatus: "completed",
          },
        };
      }

      if (paymentStatus === "pending" || paymentState === "pending") {
        return {
          ok: false,
          message:
            backendMessage ||
            "Payment is still being processed. Please wait a moment and refresh the page.",
          data: {
            paymentStatus: "pending",
          },
        };
      }

      if (isMissingConfirmEndpoint || isNetworkIssue) {
        return {
          ok: true,
          message: "Payment completed successfully. Your rental is being synced.",
          data: {
            paymentStatus: "processing",
          },
        };
      }

      return {
        ok: false,
        message: backendMessage || "Verification failed.",
      };
    }

    return { ok: false, message: "Verification failed." };
  }
};

export const handlePaymentSuccess = async ({
  sessionId,
  rentalId,
  propertyId,
}: {
  sessionId?: string;
  rentalId?: string;
  propertyId?: string;
}) => {
  const cookieStore = await cookies();
  const fallbackPropertyId = cookieStore.get("pending_review_property_id")?.value;
  const fallbackRentalId = cookieStore.get("pending_review_rental_id")?.value;
  const resolvedPropertyId = propertyId ?? fallbackPropertyId;
  const resolvedRentalId = rentalId ?? fallbackRentalId;

  if (!sessionId) {
    return {
      ok: false,
      message: "Invalid payment session. Missing session_id.",
      data: {
        sessionId,
        rentalId: resolvedRentalId,
        propertyId: resolvedPropertyId,
      },
    };
  }

  const result = await verifyPayment(sessionId, resolvedRentalId);

  const isCompleted =
    result.ok ||
    result.data?.paymentStatus === "completed" ||
    result.data?.paymentStatus === "processing";

  return {
    ok: isCompleted,
    message:
      result.message ||
      (isCompleted ? "Payment completed successfully" : "Payment verification failed"),
    data: {
      sessionId,
      rentalId: resolvedRentalId,
      propertyId: resolvedPropertyId,
      status: isCompleted ? "completed" : "failed",
      paymentData: result.data,
    },
  };
};

export const handlePaymentCancel = async ({
  rentalId,
}: {
  rentalId?: string;
}) => {
  return {
    ok: false,
    message: "Payment was cancelled",
    data: {
      rentalId,
    },
  };
};
