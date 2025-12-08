import { Role, User } from "./types";

const normalizeRoleValue = (role?: string | null): Role | null => {
  if (!role) return null;
  const normalized = role.trim().toUpperCase();
  if (normalized === "RIDER" || normalized === "ROLE_USER") {
    return "ROLE_USER";
  }
  if (normalized === "DRIVER" || normalized === "ROLE_DRIVER") {
    return "ROLE_DRIVER";
  }
  return null;
};

export const ensureRole = (role?: string | Role | null): Role => {
  if (!role) return "ROLE_USER";
  const normalized = normalizeRoleValue(role);
  return normalized ?? "ROLE_USER";
};

export const getStoredToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("rideshareToken");
};

export const getStoredUser = (): User | null => {
  if (typeof window === "undefined") return null;
  const userStr = localStorage.getItem("rideshareUser");
  if (!userStr) return null;
  try {
    const parsed = JSON.parse(userStr) as Partial<User> & {
      role?: string | null;
    };
    const normalizedRole = normalizeRoleValue(parsed.role);
    if (!normalizedRole || !parsed.id || !parsed.name || !parsed.username) {
      return null;
    }
    const normalizedUser: User = {
      id: parsed.id,
      name: parsed.name,
      username: parsed.username,
      role: normalizedRole,
    };
    if (parsed.role !== normalizedRole) {
      localStorage.setItem("rideshareUser", JSON.stringify(normalizedUser));
    }
    return normalizedUser;
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
