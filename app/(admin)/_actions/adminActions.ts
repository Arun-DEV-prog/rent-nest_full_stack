// app/_actions/adminActions.ts
"use server"
import axios from "axios";
import { revalidateTag, unstable_cache } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL = "https://rentnest-backend-six.vercel.app/api";
const ADMIN_USERS_TAG = "admin-users";
const ADMIN_RENTALS_TAG = "admin-rentals";
const ADMIN_PROPERTIES_TAG = "admin-properties";

const getAuthHeader = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) redirect("/login");

  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString("utf-8")
    ) as { role?: string; exp?: number };

    if (payload.role !== "admin") redirect("/unauthorized");
    if (payload.exp && payload.exp * 1000 < Date.now()) redirect("/login");
  } catch {
    redirect("/login");
  }

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
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
  };
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

const fetchAdminUsers = async (page: number, headers: Record<string, string>) => {
  const response = await axios.get(`${BASE_URL}/admin/users?page=${page}&limit=10`, { headers });
  const data = response.data as {
    success?: boolean;
    data?: AdminUser[];
    meta?: MetaData;
    message?: string;
  };
  return { ok: true, data: data.data ?? [], meta: data.meta, message: data.message };
};

const fetchAdminRentals = async (page: number, headers: Record<string, string>) => {
  const response = await axios.get(`${BASE_URL}/admin/rentals?page=${page}&limit=10`, { headers });
  const data = response.data as {
    success?: boolean;
    data?: AdminRental[];
    meta?: MetaData;
    message?: string;
  };
  return { ok: true, data: data.data ?? [], meta: data.meta, message: data.message };
};

const fetchAdminProperties = async (page: number, headers: Record<string, string>) => {
  const response = await axios.get(`${BASE_URL}/admin/properties?page=${page}&limit=10`, { headers });
  const data = response.data as {
    success?: boolean;
    data?: AdminProperty[];
    meta?: MetaData;
    message?: string;
  };
  return { ok: true, data: data.data ?? [], meta: data.meta, message: data.message };
};

const getAdminUsersCached = unstable_cache(
  async (page: number, headers: Record<string, string>) => fetchAdminUsers(page, headers),
  [],
  { revalidate: 60, tags: [ADMIN_USERS_TAG] }
);

const getAdminRentalsCached = unstable_cache(
  async (page: number, headers: Record<string, string>) => fetchAdminRentals(page, headers),
  [],
  { revalidate: 60, tags: [ADMIN_RENTALS_TAG] }
);

const getAdminPropertiesCached = unstable_cache(
  async (page: number, headers: Record<string, string>) => fetchAdminProperties(page, headers),
  [],
  { revalidate: 60, tags: [ADMIN_PROPERTIES_TAG] }
);

export const getAdminUsers = async (page = 1) => {
  try {
    const headers = await getAuthHeader();
    return await getAdminUsersCached(page, headers);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) redirect("/login");
      if (error.response?.status === 403) redirect("/unauthorized");
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to fetch users.",
        data: [] as AdminUser[],
        meta: undefined,
      };
    }
    return { ok: false, message: "Failed to fetch users.", data: [] as AdminUser[], meta: undefined };
  }
};

export const getAdminRentals = async (page = 1) => {
  try {
    const headers = await getAuthHeader();
    return await getAdminRentalsCached(page, headers);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) redirect("/login");
      if (error.response?.status === 403) redirect("/unauthorized");
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to fetch rentals.",
        data: [] as AdminRental[],
        meta: undefined,
      };
    }
    return { ok: false, message: "Failed to fetch rentals.", data: [] as AdminRental[], meta: undefined };
  }
};

export const getAdminProperties = async (page = 1) => {
  try {
    const headers = await getAuthHeader();
    return await getAdminPropertiesCached(page, headers);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) redirect("/login");
      if (error.response?.status === 403) redirect("/unauthorized");
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to fetch properties.",
        data: [] as AdminProperty[],
        meta: undefined,
      };
    }
    return { ok: false, message: "Failed to fetch properties.", data: [] as AdminProperty[], meta: undefined };
  }
};

export const getAdminUserById = async (userId: string) => {
  try {
    const headers = await getAuthHeader();
    const response = await axios.get(
      `${BASE_URL}/admin/users/${userId}`,
      { headers }
    );
    const data = response.data as {
      success?: boolean;
      data?: AdminUser;
      message?: string;
    };
    return { ok: true, data: data.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) redirect("/login");
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to fetch user.",
        data: undefined,
      };
    }
    return { ok: false, message: "Failed to fetch user.", data: undefined };
  }
};

export const updateUserStatus = async (
  userId: string,
  status: "active" | "banned"
) => {
  try {
    const headers = await getAuthHeader();
    const response = await axios.patch(
      `${BASE_URL}/admin/users/${userId}`,
      { status },
      { headers }
    );
    const data = response.data as { success?: boolean; message?: string };
    revalidateTag(ADMIN_USERS_TAG, "default");
    return { ok: data.success ?? false, message: data.message };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) redirect("/login");
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to update user.",
      };
    }
    return { ok: false, message: "Failed to update user." };
  }
};