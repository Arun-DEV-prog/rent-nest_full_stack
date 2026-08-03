
"use server"
import axiosInstance from "@/lib/axios";
import axios from "axios";
import { cookies } from "next/headers";
import { revalidateTag, unstable_cache } from "next/cache";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  status: string;
  divison: string;
  district: string;
};

const PROFILE_TAG = "profile";

const fetchProfile = async (token: string) => {
  try {
    const response = await axiosInstance.get("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const responseData = response.data as {
      success?: boolean;
      message?: string;
      data?: UserProfile;
    };

    if (!responseData.success) {
      return { ok: false, message: responseData.message || "Failed to fetch profile." };
    }

    return { ok: true, user: responseData.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return { ok: false, message: "Your session has expired. Please log in again." };
      }
      return {
        ok: false,
        message: error.response?.data?.message || error.message || "Failed to fetch profile.",
      };
    }
    return { ok: false, message: "Failed to fetch profile." };
  }
};

const getProfileCached = unstable_cache(
  async (token: string) => fetchProfile(token),
  [],
  {
    revalidate: 300,
    tags: [PROFILE_TAG],
  }
);

export const getProfile = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { ok: false, message: "You must be logged in." };
  }

  return getProfileCached(token);
};

export const revalidateProfile = async () => {
  revalidateTag(PROFILE_TAG, "default");
};