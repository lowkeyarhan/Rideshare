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

export type LoginResponse = {
  token: string;
  id: string;
  name: string;
  username: string;
  role: Role;
};

export const registerUser = async (payload: RegisterPayload) => {
  const { data } = await apiClient.post("/api/auth/register", payload);
  return data;
};

export const loginUser = async (payload: LoginPayload) => {
  const { data } = await apiClient.post<LoginResponse>(
    "/api/auth/login",
    payload
  );
  return data;
};
