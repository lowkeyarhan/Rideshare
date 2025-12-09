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
  userUsername?: string;
  driverUsername?: string;
  pickupLocation: string;
  dropLocation: string;
  distance: number;
  fare: number;
  status: Status;
  requestedAt?: string;
  acceptedAt?: string;
  completedAt?: string;
  createdAt?: string;
};

export type PageResponse<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  pageNumber: number;
  pageSize: number;
};

export type RidesPerDayResponse = {
  date: string;
  count: number;
};

export type StatusSummaryResponse = {
  status: Status;
  count: number;
};

export type DriverSummaryResponse = {
  driverId: string;
  driverUsername: string;
  totalRides: number;
  totalEarnings: number;
};

export type UserSpendingResponse = {
  userId: string;
  userUsername: string;
  totalRides: number;
  totalSpending: number;
};
