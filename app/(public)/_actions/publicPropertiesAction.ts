// app/_actions/publicPropertiesAction.ts
"use server"
import axiosInstance from "@/lib/axios";
import axios from "axios";


export type PublicProperty = {
  id: string;
  title: string;
  description: string | null;
  rent: string;
  bedrooms: string;
  bathrooms: string;
  size_sqft: string;
  floor: string;
  availability: boolean;
  available_from: string;
  address: string;
  division: string;
  images: string;
  userId: string;
  categoriesId: number;
  categories: { id: number; name: string };
};

export const getPublicProperties = async () => {
  try {
    const response = await axiosInstance.get("/api/properties");
    const responseData = response.data as {
      success?: boolean;
      message?: string;
      data?: PublicProperty[];
    };

    if (!responseData.success) {
      return { ok: false, message: responseData.message || "Failed to fetch properties." };
    }

    return { ok: true, properties: responseData.data ?? [] };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        ok: false,
        message: error.response?.data?.message || error.message || "Failed to fetch properties.",
      };
    }
    return { ok: false, message: "Failed to fetch properties." };
  }
};

export const getPropertyById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/properties/${id}`);
    const responseData = response.data as {
      success?: boolean;
      message?: string;
      data?: PublicProperty;
    };

    if (!responseData.success) {
      return { ok: false, message: responseData.message || "Property not found." };
    }

    return { ok: true, property: responseData.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        ok: false,
        message: error.response?.data?.message || error.message || "Failed to fetch property.",
      };
    }
    return { ok: false, message: "Failed to fetch property." };
  }
};