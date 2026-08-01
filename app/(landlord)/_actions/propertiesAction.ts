"use server"
import axiosInstance from "@/lib/axios";
import { PropertyFormData } from "@/lib/propertySchema";
import { RentalRequest } from "@/lib/types/types";
import axios from "axios";
import { cookies } from "next/headers";

export const landlordProperties = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return {
      ok: false,
      message: "You must be logged in to view properties.",
    };
  }

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
      properties: responseData.data,   // ✅ was `property: responseData.property`
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

export const landlordPropertiesRequest = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return {
      ok: false,
      message: "You must be logged in to view rental requests.",
    };
  }

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