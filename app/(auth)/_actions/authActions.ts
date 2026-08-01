"use server";

import axios from "axios";
import axiosInstance from "@/lib/axios";
import type { RegisterFormData } from "@/lib/registerSchema";
import type { AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"
import jwt, { JwtPayload } from 'jsonwebtoken';




export type LoginResult =
  | { ok: true; data: any; message?: string }
  | { ok: false; message: string };


type LoginState = {
  success: boolean;
  message: string;
};

export async function registerAction(data: RegisterFormData) {
  try {
    const response = await axiosInstance.post("/api/auth/register", data);

    return {
      ok: true,
      data: response.data,
    };
  } catch (error: unknown) {
    console.error("Registration failed:", error);

    if (axios.isAxiosError(error)) {
      // axios uses 'ECONNABORTED' for timeouts in many environments; include both codes
      if (error.code === "ETIMEDOUT" || error.code === "ECONNABORTED") {
        return {
          ok: false,
          message: "Registration request timed out. Please check your network or try again later.",
        };
      }

      const message =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";

      return {
        ok: false,
        message,
      };
    }

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


export const loginAction = async (
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> => {
  let res;
  try {
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    res = await axiosInstance.post("/api/auth/login", payload);

    if (!res.data.success) {
      return {
        success: false,
        message: res.data.message,
      };
    }

    const cookieStore = await cookies();

    cookieStore.set("accessToken", res.data.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });

    cookieStore.set("refresToken", res.data.data.refresToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 7,
      sameSite: "lax",
    });
  } catch (error: any) {
    // If a NEXT redirect was thrown elsewhere, let it bubble up
    if (error && (error.message === "NEXT_REDIRECT" || error?.name === "NEXT_REDIRECT")) {
      throw error;
    }

    console.error("LOGIN ERROR");
    console.error(error?.code);
    console.error(error?.message);
    console.error(error?.response?.status);
    console.error(error?.response?.data);

    return {
      success: false,
      message: error?.response?.data?.message || error?.message || "Login failed",
    };
  }

  // perform redirects outside the try/catch so Next's redirect() isn't caught
  try {
    const decodeToken = jwt.decode(res.data.data.accessToken) as JwtPayload | null;

    const role = decodeToken?.role as string | undefined;
    console.log("role",role)

    if (role === "tenant") return redirect("/tentant-dashboard");
    if (role === "landlord") return redirect("/landlord-dashboard");
    if (role === "admin") return redirect("/admin-dashboard");
  } catch (err) {
    // If redirect throws, rethrow so Next handles it
    throw err;
  }

  return {
    success: true,
    message: res.data.message,
  };
};


export const logoutAction = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  redirect("/login");
};

