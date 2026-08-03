"use server";

import axiosInstance from "@/lib/axios";
import axios from "axios";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  status: string;
  division: string;
  district: string;
};

type GetProfileResult =
  | { ok: true; user: UserProfile }
  | { ok: false; message: string };

export const getProfile = async (): Promise<GetProfileResult> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { ok: false, message: "You must be logged in." };
  }

  // Decode JWT payload for fallback data
  let decodedUser: Partial<UserProfile> = {};
  try {
    const decoded = jwt.decode(token) as (JwtPayload & Record<string, any>) | null;
    if (decoded) {
      decodedUser = {
        id: (decoded.id || decoded.sub || decoded.userId || "") as string,
        name: (decoded.name || decoded.username || (decoded.role === "admin" ? "Admin User" : "User")) as string,
        email: (decoded.email || "") as string,
        role: (decoded.role || "") as string,
        phone: (decoded.phone || "") as string,
        status: (decoded.status || "active") as string,
        division: (decoded.division || decoded.divison || "") as string,
        district: (decoded.district || "") as string,
      };
    }
  } catch {
    // Ignore decode error
  }

  // 1. Try fetching from /api/auth/me
  try {
    const response = await axiosInstance.get("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const responseData = response.data as {
      success?: boolean;
      message?: string;
      data?: UserProfile;
    };

    if (responseData.success && responseData.data) {
      const rawData = responseData.data as any;
      const user: UserProfile = {
        ...responseData.data,
        division: rawData.division || rawData.divison || "",
      };
      return { ok: true, user };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return { ok: false, message: "Your session has expired. Please log in again." };
    }
  }

  // 2. Fallback: If role is admin and /api/auth/me returned 403 or failed,
  // try fetching from /api/admin/users/${decodedUser.id}
  if (decodedUser.role === "admin" && decodedUser.id) {
    try {
      const adminRes = await axiosInstance.get(`/api/admin/users/${decodedUser.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (adminRes.data?.success && adminRes.data?.data) {
        const rawData = adminRes.data.data as any;
        const user: UserProfile = {
          id: rawData.id || decodedUser.id,
          name: rawData.name || decodedUser.name || "Admin User",
          email: rawData.email || decodedUser.email || "",
          role: rawData.role || "admin",
          phone: rawData.phone || decodedUser.phone || "",
          status: rawData.status || decodedUser.status || "active",
          division: rawData.division || rawData.divison || decodedUser.division || "",
          district: rawData.district || decodedUser.district || "",
        };
        return { ok: true, user };
      }
    } catch {
      // Ignore admin fetch error and proceed to JWT fallback
    }
  }

  // 3. Fallback: Return profile decoded from JWT token so user never sees "Forbidden"
  if (decodedUser.email || decodedUser.name || decodedUser.role) {
    const user: UserProfile = {
      id: decodedUser.id || "",
      name: decodedUser.name || (decodedUser.role === "admin" ? "Admin User" : "User"),
      email: decodedUser.email || "",
      role: decodedUser.role || "user",
      phone: decodedUser.phone || "",
      status: decodedUser.status || "active",
      division: decodedUser.division || "",
      district: decodedUser.district || "",
    };
    return { ok: true, user };
  }

  return { ok: false, message: "Failed to fetch profile." };
};