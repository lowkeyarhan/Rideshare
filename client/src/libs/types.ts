export type Role = "ROLE_USER" | "ROLE_DRIVER";
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
  createdAt?: string;
};
