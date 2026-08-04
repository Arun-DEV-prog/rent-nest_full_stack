// app/_actions/reviewAction.ts
"use server"
import axiosInstance from "@/lib/axios";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export const submitReview = async (data: {
  propertyId: string;
  rating: number;
  comment: string;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) redirect("/login");

  try {
    const response = await axiosInstance.post(
      "/api/reviews",
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const responseData = response.data as {
      success?: boolean;
      message?: string;
    };

    if (!responseData.success) {
      return { ok: false, message: responseData.message || "Failed to submit review." };
    }

    revalidateTag("tenant-rentals", "default");
    revalidateTag("public-properties", "default");
    revalidateTag("public-property", "default");

    return { ok: true, message: responseData.message };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) redirect("/login");
      return {
        ok: false,
        message: error.response?.data?.message || error.message || "Failed to submit review.",
      };
    }
    return { ok: false, message: "Failed to submit review." };
  }
};
