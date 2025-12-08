import apiClient from "./apiClient";
import { Ride, Status } from "./types";

export const fetchDriverRides = async (driverId: string) => {
  const { data } = await apiClient.get<Ride[]>(`/api/rides/driver/${driverId}`);
  return data;
};

export const fetchAvailableRides = async () => {
  const { data } = await apiClient.get<Ride[]>("/api/rides/available");
  return data;
};

export const acceptRide = async (rideId: string, driverId: string) => {
  const { data } = await apiClient.put<Ride>(`/api/rides/${rideId}`, {
    driverId,
    status: "ACCEPTED" as const,
  });
  return data;
};
