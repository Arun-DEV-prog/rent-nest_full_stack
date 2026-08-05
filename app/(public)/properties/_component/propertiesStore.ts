"use client";

import { create } from "zustand";

export type Filters = {
  keyword?: string;
  type?: string | null;
  city?: string | null;
  availableNow?: boolean;
  minPrice?: number | null;
  maxPrice?: number | null;
  bedrooms?: number | null;
};

export type SortOption = "newest" | "priceLow" | "priceHigh";

const EMPTY_FILTERS: Filters = {
  keyword: undefined,
  type: null,
  city: null,
  availableNow: false,
  minPrice: null,
  maxPrice: null,
  bedrooms: null,
};

interface PropertiesState {
  currentPage: number;
  filters: Filters;
  showMobileFilters: boolean;
  sort: SortOption;
  setCurrentPage: (page: number) => void;
  setFilters: (filters: Filters) => void;
  setSort: (sort: SortOption) => void;
  setShowMobileFilters: (show: boolean) => void;
}

export const usePropertiesStore = create<PropertiesState>((set) => ({
  currentPage: 1,
  filters: EMPTY_FILTERS,
  showMobileFilters: false,
  sort: "newest",
  setCurrentPage: (page) => set({ currentPage: page }),
  setFilters: (filters) => set({ filters, currentPage: 1 }),
  setSort: (sort) => set({ sort, currentPage: 1 }),
  setShowMobileFilters: (show) => set({ showMobileFilters: show }),
}));
