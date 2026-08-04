// app/_actions/publicPropertiesAction.ts
"use server"
import axios from "axios";
import { revalidateTag, unstable_cache } from "next/cache";

const BASE_URL = "https://rentnest-backend-six.vercel.app/api";

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
  images: string | null;
  userId: string;
  categoriesId: number;
  categories: { id: number; name: string } | null;
};

export type PropertyFilters = {
  keyword?: string;
  location?: string | null;
  type?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  bedrooms?: number | null;
  availableNow?: boolean;
  page?: number;
  limit?: number;
};

export type MetaData = {
  total: number;
  page: number;
  limit: number;
  pages: number;
};

const PUBLIC_PROPERTIES_TAG = "public-properties";
const PUBLIC_PROPERTY_TAG = "public-property";

const fetchPublicProperties = async (filters: PropertyFilters = {}) => {
  try {
    const params = new URLSearchParams();

    if (filters.keyword) params.set("search", filters.keyword);
    if (filters.location) params.set("location", filters.location);
    if (filters.type) params.set("type", filters.type);
    if (filters.minPrice != null) params.set("minPrice", String(filters.minPrice));
    if (filters.maxPrice != null) params.set("maxPrice", String(filters.maxPrice));
    if (filters.bedrooms != null) params.set("bedrooms", String(filters.bedrooms));
    if (filters.availableNow) params.set("availability", "true");
    if (filters.page != null) params.set("page", String(filters.page));
    params.set("limit", String(filters.limit ?? 6));

    const url = `${BASE_URL}/properties?${params.toString()}`;

    const response = await axios.get(url);
    const responseData = response.data as {
      success?: boolean;
      message?: string;
      data?: PublicProperty[];
      meta?: MetaData;
    };

    if (!responseData.success) {
      return { ok: false, message: responseData.message || "Failed to fetch properties.", properties: [], meta: undefined };
    }

    return { ok: true, properties: responseData.data ?? [], meta: responseData.meta };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        ok: false,
        message: error.response?.data?.message || error.message || "Failed to fetch properties.",
        properties: [],
        meta: undefined,
      };
    }
    return { ok: false, message: "Failed to fetch properties.", properties: [], meta: undefined };
  }
};

const fetchPropertyById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/properties/${id}`);
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
      return { ok: false, message: error.response?.data?.message || "Failed to fetch property." };
    }
    return { ok: false, message: "Failed to fetch property." };
  }
};

export const getPublicProperties = unstable_cache(
  async (filters: PropertyFilters = {}) => fetchPublicProperties(filters),
  [],
  {
    revalidate: 60,
    tags: [PUBLIC_PROPERTIES_TAG],
  }
);

export const getPropertyById = unstable_cache(
  async (id: string) => fetchPropertyById(id),
  [],
  {
    revalidate: 300,
    tags: [PUBLIC_PROPERTY_TAG],
  }
);

export const revalidatePublicProperties = async () => {
  revalidateTag(PUBLIC_PROPERTIES_TAG);
  revalidateTag(PUBLIC_PROPERTY_TAG);
};