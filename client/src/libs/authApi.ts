import apiClient from "./apiClient";
import { Role } from "./types";

export type RegisterPayload = {
  name: string;
  username: string;
  password: string;
  role: Role;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  id: string;
  name: string;
  username: string;
  role: Role;
};

export const registerUser = (payload: RegisterPayload) =>
  apiClient
    .post<AuthResponse>("/api/auth/register", payload)
    .then(({ data }) => data);

export const loginUser = (payload: LoginPayload) =>
  apiClient
    .post<AuthResponse>("/api/auth/login", payload)
    .then(({ data }) => data);
