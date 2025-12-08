import { Role, User } from "./types";

export const getStoredToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("rideshareToken");
};

export const getStoredUser = (): User | null => {
  if (typeof window === "undefined") return null;
  const userStr = localStorage.getItem("rideshareUser");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr) as User;
  } catch {
    return null;
  }
};

export const clearAuth = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("rideshareToken");
  localStorage.removeItem("rideshareUser");
};

export const isAuthenticated = (): boolean => {
  return !!getStoredToken();
};

export const hasRole = (role: Role): boolean => {
  const user = getStoredUser();
  return user?.role === role;
};
