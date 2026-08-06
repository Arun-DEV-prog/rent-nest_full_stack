"use server";

import axios from "axios";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";
import { propertySchema, type PropertyFormData } from "@/lib/propertySchema";

export type CreatePropertyResult =
  | { ok: true; property: PropertyFormData; message?: string }
  | { ok: false; message: string };

export type PropertyCategory = {
  id: number;
  name: string;
  description?: string;
  propertiesCount?: number;
};

export async function getPropertyCategoriesAction(): Promise<{
  ok: boolean;
  data?: PropertyCategory[];
  message?: string;
}> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const response = await axiosInstance.get("/api/properties/categories", {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
    });

    const payload = response.data as {
      success?: boolean;
      data?: PropertyCategory[];
      message?: string;
    };

    return {
      ok: true,
      data: Array.isArray(payload?.data) ? payload.data : [],
      message: payload?.message,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        ok: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to load property categories.",
      };
    }

    return {
      ok: false,
      message: "Failed to load property categories.",
    };
  }
}

export async function createPropertyAction(
  data: PropertyFormData,
): Promise<CreatePropertyResult> {
  const payload = propertySchema.parse(data);

  // Read the JWT that was set on login. Adjust "token" to whatever
  // cookie name your login flow actually sets (e.g. "jwt", "auth_token").
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return {
      ok: false,
      message: "You must be logged in to create a property.",
    };
  }

  try {
    const response = await axiosInstance.post("api/landlord/properties", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = response.data as {
      ok?: boolean;
      success?: boolean;
      message?: string;
      property?: PropertyFormData;
    };

    const failed = responseData.ok === false || responseData.success === false;

    if (failed) {
      return {
        ok: false,
        message:
          responseData.message || `Failed to create property: ${response.status}`,
      };
    }

    return {
      ok: true,
      property: responseData.property ?? payload,
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
          "Failed to create property.",
      };
    }

    return {
      ok: false,
      message: "Failed to create property.",
    };
  }
}