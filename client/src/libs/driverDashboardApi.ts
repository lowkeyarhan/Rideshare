import apiClient from "./apiClient";
import {
  Ride,
  RidesPerDayResponse,
  StatusSummaryResponse,
  DriverSummaryResponse,
} from "./types";

// Fetch driver's assigned rides
export const fetchDriverRides = () =>
  apiClient.get<Ride[]>("/api/v1/rides/driver/me").then(({ data }) => data);

// Fetch pending ride requests (REQUESTED status)
export const fetchAvailableRides = () =>
  apiClient.get<Ride[]>("/api/v1/rides/pending").then(({ data }) => data);

// Accept a ride request
export const acceptRide = (rideId: string) =>
  apiClient
    .post<Ride>(`/api/v1/rides/accept/${rideId}`)
    .then(({ data }) => data);

// Complete a ride
export const completeRide = (rideId: string) =>
  apiClient
    .post<Ride>(`/api/v1/rides/complete/${rideId}`)
    .then(({ data }) => data);

// Get active rides for driver
export const getDriverActiveRides = (driverId: string) =>
  apiClient
    .get<Ride[]>(`/api/v1/rides/driver/${driverId}/active-rides`)
    .then(({ data }) => data);

// Search rides by pickup or drop location keyword
export const searchRides = (text: string) =>
  apiClient
    .get<Ride[]>(`/api/v1/rides/search?text=${encodeURIComponent(text)}`)
    .then(({ data }) => data);

// Analytics: Rides per day
export const getRidesPerDay = () =>
  apiClient
    .get<RidesPerDayResponse[]>("/api/v1/analytics/rides-per-day")
    .then(({ data }) => data);

// Analytics: Status summary
export const getStatusSummary = () =>
  apiClient
    .get<StatusSummaryResponse[]>("/api/v1/analytics/status-summary")
    .then(({ data }) => data);

// Analytics: Driver summary
export const getDriverSummary = (driverId: string) =>
  apiClient
    .get<DriverSummaryResponse>(`/api/v1/analytics/driver/${driverId}/summary`)
    .then(({ data }) => data);

// Analytics: Driver earnings
export const getDriverEarnings = (driverId: string) =>
  apiClient
    .get<DriverSummaryResponse>(`/api/v1/analytics/driver/${driverId}/earnings`)
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

// Get rides on specific date
export const getRidesOnDate = (date: string) =>
  apiClient.get<Ride[]>(`/api/v1/rides/date/${date}`).then(({ data }) => data);
