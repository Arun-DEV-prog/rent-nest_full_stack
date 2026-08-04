
"use server"
import axiosInstance from "@/lib/axios";
import { PropertyFormData } from "@/lib/propertySchema";
import axios from "axios";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

const invalidatePropertyCaches = () => {
  revalidateTag("landlord-properties");
  revalidateTag("public-properties");
  revalidateTag("public-property");
};

export const deleteProperty = async (propertyId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { ok: false, message: "You must be logged in." };
  }

  try {
    const response = await axiosInstance.delete(`/api/landlord/properties/${propertyId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const responseData = response.data as { success?: boolean; message?: string };

    if (!responseData.success) {
      return { ok: false, message: responseData.message || "Failed to delete property." };
    }

    invalidatePropertyCaches();

    return { ok: true, message: responseData.message };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return { ok: false, message: "Your session has expired. Please log in again." };
      }
      return {
        ok: false,
        message: error.response?.data?.message || error.message || "Failed to delete property.",
      };
    }
    return { ok: false, message: "Failed to delete property." };
  }
};

export const updateProperty = async (propertyId: string, data: PropertyFormData) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { ok: false, message: "You must be logged in." };
  }

  try {
    const response = await axiosInstance.put(`/api/landlord/properties/${propertyId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const responseData = response.data as {
      success?: boolean;
      message?: string;
      data?: PropertyFormData;
    };

    if (!responseData.success) {
      return { ok: false, message: responseData.message || "Failed to update property." };
    }

    invalidatePropertyCaches();

    return { ok: true, message: responseData.message, property: responseData.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return { ok: false, message: "Your session has expired. Please log in again." };
      }
      return {
        ok: false,
        message: error.response?.data?.message || error.message || "Failed to update property.",
      };
    }
    return { ok: false, message: "Failed to update property." };
  }
};