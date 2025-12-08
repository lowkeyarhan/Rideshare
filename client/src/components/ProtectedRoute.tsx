"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, hasRole } from "@/src/libs/auth";
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

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth");
      return;
    }

    if (requiredRole && !hasRole(requiredRole)) {
      router.push("/auth");
    }
  }, [router, requiredRole]);

  if (!isAuthenticated()) {
    return null;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return null;
  }

  return <>{children}</>;
}
