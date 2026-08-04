
"use server"
import axiosInstance from "@/lib/axios";
import axios from "axios";
import { revalidateTag, unstable_cache } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// app/_actions/adminActions.t
const ADMIN_USERS_TAG = "admin-users";
const ADMIN_RENTALS_TAG = "admin-rentals";
const ADMIN_PROPERTIES_TAG = "admin-properties";

const getAuthHeader = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const role = cookieStore.get("role")?.value;

  if (!token) redirect("/login");
  if (role !== "admin") redirect("/login");

  return { Authorization: `Bearer ${token}` };
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "landlord" | "tenant";
  status: string;
  divison: string;
  district: string;
  created_at: string;
  updated_at: string;
};

export type AdminRental = {
  id: string;
  properties_id: string;
  userId: string;
  move_in_date: string;
  lease_duration: string;
  status: string;
  created_at: string;
  updated_at: string;
  user: { id: string; name: string; email: string; phone: string; role: string };
  properties: {
    id: string;
    title: string;
    rent: string;
    address: string;
    user: { id: string; name: string; email: string };
  };
};

export type AdminProperty = {
  id: string;
  title: string;
  rent: string;
  bedrooms: string;
  bathrooms: string;
  address: string;
  division: string;
  availability: boolean;
  available_from: string;
  images: string | null;
  categories: { id: number; name: string } | null;
  userId: string;
};

export type MetaData = {
  total: number;
  page: number;
  limit: number;
  pages: number;
};

const fetchAdminUsers = async (headers: Record<string, string>) => {
  const response = await axiosInstance.get(`/api/admin/users`, { headers });
  const data = response.data as { success?: boolean; data?: AdminUser[]; meta?: MetaData; message?: string };
  return { ok: true, data: data.data ?? [], meta: data.meta };
};

const fetchAdminRentals = async (headers: Record<string, string>) => {
  const response = await axiosInstance.get(`api/admin/rentals?`, { headers });
  const data = response.data as { success?: boolean; data?: AdminRental[]; meta?: MetaData; message?: string };
  return { ok: true, data: data.data ?? [], meta: data.meta };
};

const fetchAdminProperties = async (headers: Record<string, string>) => {
  const response = await axiosInstance.get(`/api/admin/properties`, { headers });
  const data = response.data as { success?: boolean; data?: AdminProperty[]; meta?: MetaData; message?: string };
  return { ok: true, data: data.data ?? [], meta: data.meta };
};

const getAdminUsersCached = unstable_cache(
  async (headers: Record<string, string>) => fetchAdminUsers(headers),
  [],
  { revalidate: 60, tags: [ADMIN_USERS_TAG] }
);

const getAdminRentalsCached = unstable_cache(
  async (headers: Record<string, string>) => fetchAdminRentals(headers),
  [],
  { revalidate: 60, tags: [ADMIN_RENTALS_TAG] }
);

const getAdminPropertiesCached = unstable_cache(
  async (headers: Record<string, string>) => fetchAdminProperties(headers),
  [],
  { revalidate: 60, tags: [ADMIN_PROPERTIES_TAG] }
);

export const getAdminUsers = async () => {
  try {
    const headers = await getAuthHeader();
    return await getAdminUsersCached(headers);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) redirect("/login");
      return { ok: false, message: error.response?.data?.message || "Failed to fetch users.", data: [], meta: undefined };
    }
    return { ok: false, message: "Failed to fetch users.", data: [], meta: undefined };
  }
};

export const getAdminRentals = async () => {
  try {
    const headers = await getAuthHeader();
    return await getAdminRentalsCached(headers);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) redirect("/login");
      return { ok: false, message: "Failed to fetch rentals.", data: [], meta: undefined };
    }
    return { ok: false, message: "Failed to fetch rentals.", data: [], meta: undefined };
  }
};

export const getAdminProperties = async () => {
  try {
    const headers = await getAuthHeader();
    return await getAdminPropertiesCached(headers);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) redirect("/login");
      return { ok: false, message: "Failed to fetch properties.", data: [], meta: undefined };
    }
    return { ok: false, message: "Failed to fetch properties.", data: [], meta: undefined };
  }
};

export const updateUserStatus = async (userId: string, status: "active" | "blocked") => {
  try {
    const headers = await getAuthHeader();
    const response = await axiosInstance.patch(
      `/api/admin/users/${userId}/status`,
      { status },
      { headers },
    );
    const data = response.data as { success?: boolean; message?: string };
    revalidateTag(ADMIN_USERS_TAG);
    return { ok: data.success ?? false, message: data.message };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to update user.",
      };
    }
    return { ok: false, message: "Failed to update user." };
  }
};

export const updateRentalStatus = async (
  rentalId: string,
  status: "approved" | "rejected",
) => {
  try {
    const headers = await getAuthHeader();
    const response = await axiosInstance.patch(
      `/api/admin/rentals/${rentalId}/status`,
      { status },
      { headers },
    );
    const data = response.data as { success?: boolean; message?: string };
    revalidateTag(ADMIN_RENTALS_TAG);
    return { ok: data.success ?? false, message: data.message };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        ok: false,
        message:
          error.response?.data?.message || "Failed to update rental status.",
      };
    }
    return { ok: false, message: "Failed to update rental status." };
  }
};