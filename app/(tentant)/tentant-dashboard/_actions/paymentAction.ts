"use server"
import axiosInstance from "@/lib/axios";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

    cookieStore.set("pending_review_property_id", propertyId, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 10,
    });

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

export const verifyPayment = async (sessionId: string, rentalId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) redirect("/login");

  try {
    const response = await axiosInstance.post(
      "/api/payments/confirm",
      { sessionId, rentalId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const responseData = response.data as {
      success?: boolean;
      message?: string;
      data?: Record<string, unknown>;
    };

    return {
      ok: responseData.success ?? false,
      message: responseData.message,
      data: responseData.data,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) redirect("/login");
      return {
        ok: false,
        message: error.response?.data?.message || "Verification failed.",
      };
    }
    return { ok: false, message: "Verification failed." };
  }
};