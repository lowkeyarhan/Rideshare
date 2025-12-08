export type Role = "RIDER" | "DRIVER" | "ADMIN";
export type Status = "REQUESTED" | "COMPLETED" | "ACCEPTED";

export type User = {
  id: string;
  name: string;
  username: string;
  role: Role;
};

export type Ride = {
  id: string;
  userId: string;
  driverId?: string | null;
  pickupLocation: string;
  dropLocation: string;
  status: Status;
  rideTime?: string;
  fare?: number;
};
