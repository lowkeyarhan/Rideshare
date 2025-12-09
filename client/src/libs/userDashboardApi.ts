import apiClient from "./apiClient";
import { Ride, PageResponse, UserSpendingResponse } from "./types";

export type RideRequestPayload = {
  pickupLocation: string;
  dropLocation: string;
};

// Fetch authenticated user's rides
export const fetchUserRides = () =>
  apiClient.get<Ride[]>("/api/v1/rides/me").then(({ data }) => data);

// Create new ride request
export const createRideRequest = (payload: RideRequestPayload) =>
  apiClient.post<Ride>("/api/v1/rides", payload).then(({ data }) => data);

// Search rides by pickup or drop location keyword
export const searchRides = (text: string) =>
  apiClient
    .get<Ride[]>(`/api/v1/rides/search?text=${encodeURIComponent(text)}`)
    .then(({ data }) => data);

// Filter rides by distance/fare range
export const filterRidesByDistance = (min: number, max: number) =>
  apiClient
    .get<Ride[]>(`/api/v1/rides/filter-distance?min=${min}&max=${max}`)
    .then(({ data }) => data);

// Filter rides by date range
export const filterRidesByDateRange = (start: string, end: string) =>
  apiClient
    .get<Ride[]>(`/api/v1/rides/filter-date-range?start=${start}&end=${end}`)
    .then(({ data }) => data);

// Sort rides by fare
export const sortRidesByFare = (order: "asc" | "desc" = "asc") =>
  apiClient
    .get<Ride[]>(`/api/v1/rides/sort?order=${order}`)
    .then(({ data }) => data);

// Filter by status with optional keyword
export const filterByStatusAndKeyword = (status: string, search?: string) =>
  apiClient
    .get<Ride[]>(
      `/api/v1/rides/filter-status?status=${status}${
        search ? `&search=${encodeURIComponent(search)}` : ""
      }`
    )
    .then(({ data }) => data);

// Advanced search with pagination
export const advancedSearch = (params: {
  search?: string;
  status?: string;
  sort?: string;
  order?: "asc" | "desc";
  page?: number;
  size?: number;
}) => {
  const queryParams = new URLSearchParams();
  if (params.search) queryParams.append("search", params.search);
  if (params.status) queryParams.append("status", params.status);
  if (params.sort) queryParams.append("sort", params.sort);
  if (params.order) queryParams.append("order", params.order);
  if (params.page !== undefined)
    queryParams.append("page", params.page.toString());
  if (params.size !== undefined)
    queryParams.append("size", params.size.toString());

  return apiClient
    .get<PageResponse<Ride>>(`/api/v1/rides/advanced-search?${queryParams}`)
    .then(({ data }) => data);
};

// Get rides on specific date
export const getRidesOnDate = (date: string) =>
  apiClient.get<Ride[]>(`/api/v1/rides/date/${date}`).then(({ data }) => data);

// Analytics: Get user spending
export const getUserSpending = (userId: string) =>
  apiClient
    .get<UserSpendingResponse>(`/api/v1/analytics/user/${userId}/spending`)
    .then(({ data }) => data);
