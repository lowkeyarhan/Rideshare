import apiClient from "./apiClient";
import { Ride, Status } from "./types";

export type RideRequestPayload = {
  userId: string;
  driverId?: string;
  pickupLocation: string;
  dropLocation: string;
  status: Status;
};

export const fetchUserRides = async (userId: string) => {
  const { data } = await apiClient.get<Ride[]>(`/api/rides/user/${userId}`);
  return data;
};

export const createRideRequest = async (payload: RideRequestPayload) => {
  const { data } = await apiClient.post<Ride>("/api/rides", payload);
  return data;
};
