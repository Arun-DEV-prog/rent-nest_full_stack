"use server";

import axiosInstance from "@/lib/axios";
import type { RegisterFormData } from "@/lib/registerSchema";

export async function registerAction(data: RegisterFormData) {
  try {
    const response = await axiosInstance.post("/api/auth/register", data);

    return {
      ok: true,
      data: response.data,
    };
  } catch (error: unknown) {
    console.error("Registration failed:", error);

    const message =
      error && typeof error === "object" && "response" in error && error.response && typeof error.response === "object" && "data" in error.response
        ? (error.response as { data?: { message?: string } }).data?.message || "Registration failed. Please try again."
        : "Registration failed. Please try again.";

    return {
      ok: false,
      message,
    };
  }
}


