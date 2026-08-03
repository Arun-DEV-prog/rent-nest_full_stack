"use server"
import axiosInstance from "@/lib/axios";
import { PropertyFormData } from "@/lib/propertySchema";
import type { RentalRequest } from "@/lib/types/types";
import axios from "axios";
import { revalidateTag, unstable_cache } from "next/cache";
import { cookies } from "next/headers";

const LANDLORD_PROPERTIES_TAG = "landlord-properties";
const LANDLORD_REQUESTS_TAG = "landlord-requests";

const fetchLandlordProperties = async (token: string) => {
  try {
    const response = await axiosInstance.get("/api/landlord/my-properties", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = response.data as {
      ok?: boolean;
      success?: boolean;
      statusCode?: number;
      message?: string;
      data?: PropertyFormData[];
    };

    const failed = responseData.ok === false || responseData.success === false;

    if (failed) {
      return {
        ok: false,
        message: responseData.message || `Failed to fetch properties: ${response.status}`,
      };
    }

    return {
      ok: true,
      properties: responseData.data,
      message: responseData.message,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return {
          ok: false,
          message: "Your session has expired. Please log in again.",
        };
      }
      return {
        ok: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch properties.",
      };
    }

    return {
      ok: false,
      message: "Failed to fetch properties.",
    };
  }
};

const fetchLandlordRequests = async (token: string) => {
  try {
    const response = await axiosInstance.get("/api/landlord/requests", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = response.data as {
      success?: boolean;
      statusCode?: number;
      message?: string;
      data?: RentalRequest[];
    };

    if (!responseData.success) {
      return {
        ok: false,
        message: responseData.message || `Failed to fetch rental requests: ${response.status}`,
      };
    }

    return {
      ok: true,
      requests: responseData.data,
      message: responseData.message,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return {
          ok: false,
          message: "Your session has expired. Please log in again.",
        };
      }
      return {
        ok: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch rental requests.",
      };
    }

    return {
      ok: false,
      message: "Failed to fetch rental requests.",
    };
  }
};

const getLandlordPropertiesCached = unstable_cache(
  async (token: string) => fetchLandlordProperties(token),
  [],
  {
    revalidate: 60,
    tags: [LANDLORD_PROPERTIES_TAG],
  }
);

const getLandlordRequestsCached = unstable_cache(
  async (token: string) => fetchLandlordRequests(token),
  [],
  {
    revalidate: 60,
    tags: [LANDLORD_REQUESTS_TAG],
  }
);

export const landlordProperties = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return {
      ok: false,
      message: "You must be logged in to view properties.",
    };
  }

  return getLandlordPropertiesCached(token);
};

export const landlordPropertiesRequest = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return {
      ok: false,
      message: "You must be logged in to view rental requests.",
    };
  }

  return getLandlordRequestsCached(token);
};



// _actions/rentalRequestAction.ts

export const updateRentalRequestStatus = async (
  requestId: string,
  status: "approved" | "rejected"
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return {
      ok: false,
      message: "You must be logged in.",
    };
  }

  try {
    const response = await axiosInstance.patch(
      `/api/landlord/requests/${requestId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseData = response.data as {
      success?: boolean;
      message?: string;
    };

    if (!responseData.success) {
      return {
        ok: false,
        message: responseData.message || "Failed to update request.",
      };
    }

    revalidateTag(LANDLORD_REQUESTS_TAG, "default");
    revalidateTag(LANDLORD_PROPERTIES_TAG, "default");

    return {
      ok: true,
      message: responseData.message,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return { ok: false, message: "Your session has expired. Please log in again." };
      }
      return {
        ok: false,
        message: error.response?.data?.message || error.message || "Failed to update request.",
      };
    }
    return { ok: false, message: "Failed to update request." };
  }
};