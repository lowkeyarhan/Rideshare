import apiClient from "./apiClient";
import { Ride } from "./types";

export const fetchDriverRides = () =>
  apiClient.get<Ride[]>("/api/v1/driver/rides").then(({ data }) => data);

export const fetchAvailableRides = () =>
  apiClient.get<Ride[]>("/api/v1/driver/rides/requests").then(({ data }) => data);

export const acceptRide = (rideId: string) =>
  apiClient.post<Ride>(`/api/v1/driver/rides/${rideId}/accept`).then(({ data }) => data);

export const completeRide = (rideId: string) =>
  apiClient.post<Ride>(`/api/v1/rides/${rideId}/complete`).then(({ data }) => data);
