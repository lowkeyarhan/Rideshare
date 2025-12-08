"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStoredToken, getStoredUser } from "@/src/libs/auth";
import type { Role } from "@/src/libs/types";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: Role;
};

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      router.replace("/auth");
      return;
    }

    const user = getStoredUser();
    if (requiredRole && user?.role !== requiredRole) {
      const fallback =
        user?.role === "ROLE_DRIVER"
          ? "/dashboard/driver"
          : "/dashboard/passenger";
      router.replace(fallback);
      return;
    }

    setIsAllowed(true);
  }, [router, requiredRole]);

  if (!isAllowed) {
    return null;
  }

  return <>{children}</>;
}
