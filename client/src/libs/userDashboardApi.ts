import apiClient from "./apiClient";
import { Ride } from "./types";

export type RideRequestPayload = {
  pickupLocation: string;
  dropLocation: string;
};

export const fetchUserRides = () =>
  apiClient.get<Ride[]>("/api/v1/user/rides").then(({ data }) => data);

export const createRideRequest = (payload: RideRequestPayload) =>
  apiClient.post<Ride>("/api/v1/rides", payload).then(({ data }) => data);
