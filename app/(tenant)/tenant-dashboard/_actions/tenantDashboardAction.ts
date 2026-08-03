"use server";

import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import axiosInstance from "@/lib/axios";
import type { RentalRequest } from "@/lib/types/types";
import { unstable_cache } from "next/cache";

type TenantRentalResponse = {
  success: boolean;
  statusCode?: number;
  message?: string;
  data?: RentalRequest[];
};

const TENANT_RENTALS_TAG = "tenant-rentals";

const fetchTenantRentals = async (token: string) => {
  try {
    const response = await axiosInstance.get<TenantRentalResponse>("/api/rentals", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const payload = response.data;

    if (!payload.success) {
      return {
        ok: false,
        message: payload.message || "Failed to load rental overview.",
        data: [] as RentalRequest[],
      };
    }

    return {
      ok: true,
      message: payload.message || "Rental overview loaded successfully.",
      data: payload.data ?? [],
    };
  } catch {
    return {
      ok: false,
      message: "Unable to load rental overview right now.",
      data: [] as RentalRequest[],
    };
  }
};

const getTenantRentalsCached = unstable_cache(
  async (token: string) => fetchTenantRentals(token),
  [],
  {
    revalidate: 60,
    tags: [TENANT_RENTALS_TAG],
  }
);

export const getTenantRentals = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return {
      ok: false,
      message: "Please log in to view your rental overview.",
      data: [] as RentalRequest[],
    };
  }

  const decoded = jwt.decode(token) as JwtPayload | null;
  const role = typeof decoded?.role === "string" ? decoded.role : null;

  if (role !== "tenant") {
    return {
      ok: false,
      message: "Only tenant accounts can view this dashboard.",
      data: [] as RentalRequest[],
    };
  }

  return getTenantRentalsCached(token);
};
