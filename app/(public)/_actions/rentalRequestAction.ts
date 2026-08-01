"use server"
import axiosInstance from "@/lib/axios";
import axios from "axios";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

const getTokenRole = (token?: string) => {
  if (!token) return null;

  const decoded = jwt.decode(token) as JwtPayload | null;
  return typeof decoded?.role === "string" ? decoded.role : null;
};

export const submitRentalRequest = async (data: {
  propertisId: string;
  move_in_date: string;
  lease_duration: string;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const role = getTokenRole(token);

  if (!token || role !== "tenant") {
    return {
      ok: false,
      message: "You must be logged in as a tenant to send a request.",
      unauthorized: true,
    };
  }

  try {
    const response = await axiosInstance.post("/api/rentals", data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const responseData = response.data as { success?: boolean; message?: string };

    if (!responseData.success) {
      return { ok: false, message: responseData.message || "Failed to submit request." };
    }

    return { ok: true, message: responseData.message };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return {
          ok: false,
          message: "Your session has expired. Please log in again.",
          unauthorized: true,
        };
      }
      return {
        ok: false,
        message: error.response?.data?.message || error.message || "Failed to submit request.",
      };
    }
    return { ok: false, message: "Failed to submit request." };
  }
};

export const checkAuth = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const role = getTokenRole(token);

  return {
    isLoggedIn: !!token && role === "tenant",
    isTenant: role === "tenant",
  };
};