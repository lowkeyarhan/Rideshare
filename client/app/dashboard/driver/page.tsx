"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import {
  fetchDriverRides,
  fetchAvailableRides,
  acceptRide,
} from "@/src/libs/driverDashboardApi";
import { getStoredUser, clearAuth } from "@/src/libs/auth";
import type { Ride, User } from "@/src/libs/types";

function DriverDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [rides, setRides] = useState<Ride[]>([]);
  const [availableRides, setAvailableRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const currentUser = getStoredUser();
    const token = localStorage.getItem("rideshareToken");

    console.log("Current User:", currentUser);
    console.log("Token exists:", !!token);

    if (!currentUser) {
      console.error("No user found in localStorage");
      return;
    }

    setUser(currentUser);

    const loadRides = async () => {
      try {
        console.log("Fetching rides for driver:", currentUser.id);
        const [assignedData, availableData] = await Promise.all([
          fetchDriverRides(currentUser.id),
          fetchAvailableRides(),
        ]);
        console.log("Assigned rides:", assignedData);
        console.log("Available rides:", availableData);
        setRides(assignedData);
        setAvailableRides(availableData);
      } catch (error) {
        console.error("Error loading rides:", error);
        if (error && typeof error === "object" && "response" in error) {
          const axiosError = error as {
            response?: { status?: number; data?: unknown };
          };
          console.error("Response status:", axiosError.response?.status);
          console.error("Response data:", axiosError.response?.data);
        }
      } finally {
        setLoading(false);
      }
    };

    loadRides();
  }, []);

  const completed = rides.filter((ride) => ride.status === "COMPLETED");
  const todaysEarnings = completed.reduce(
    (sum, ride) => sum + (ride.fare || 0),
    0
  );
  const onlineHours = 6.5; // Mock data
  const acceptanceRate = 95; // Mock data

  const logout = () => {
    clearAuth();
    router.push("/auth");
  };

  const handleAcceptRide = async (rideId: string) => {
    if (!user) return;
    setAccepting(rideId);
    try {
      await acceptRide(rideId, user.id);
      const [assignedData, availableData] = await Promise.all([
        fetchDriverRides(user.id),
        fetchAvailableRides(),
      ]);
      setRides(assignedData);
      setAvailableRides(availableData);
    } catch (error) {
      console.error(error);
      alert("Unable to accept ride. Please try again.");
    } finally {
      setAccepting(null);
    }
  };

  const formatTime = (rideTime?: string) => {
    if (!rideTime) return "Time pending";
    const date = new Date(rideTime);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatFare = (fare?: number) => {
    if (!fare) return "~$0.00";
    return `~$${fare.toFixed(2)}`;
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative flex min-h-screen w-full bg-white font-display">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-[#E5E5E5] bg-white p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div
              className="aspect-square size-10 rounded-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url("https://ui-avatars.com/api/?name=${
                  user?.name || "Driver"
                }&background=2563EB&color=fff")`,
              }}
            ></div>
            <div className="flex flex-col">
              <h1 className="text-base font-bold leading-normal text-[#1A1A1A]">
                {user?.name || "Driver"}
              </h1>
              <p className="text-sm font-normal leading-normal text-[#5C5C5C]">
                RideShare Driver
              </p>
            </div>
          </div>
          <nav className="mt-4 flex flex-col gap-2">
            <a className="flex items-center gap-3 rounded-lg bg-[#F7F7F7] px-3 py-2">
              <span
                className="material-symbols-outlined text-[#1A1A1A]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                dashboard
              </span>
              <p className="text-sm font-semibold leading-normal text-[#1A1A1A]">
                Dashboard
              </p>
            </a>
            <a
              onClick={() => router.push("/profile")}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 hover:bg-[#F7F7F7]"
            >
              <span className="material-symbols-outlined text-[#5C5C5C]">
                account_circle
              </span>
              <p className="text-sm font-medium leading-normal text-[#1A1A1A]">
                Profile
              </p>
            </a>
            <a
              onClick={logout}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 hover:bg-[#F7F7F7]"
            >
              <span className="material-symbols-outlined text-[#5C5C5C]">
                logout
              </span>
              <p className="text-sm font-medium leading-normal text-[#1A1A1A]">
                Logout
              </p>
            </a>
          </nav>
        </div>
        <div className="mt-auto">
          <div className="flex items-center justify-between gap-4 py-2">
            <p className="text-lg font-bold text-[#1A1A1A]">
              You are {isOnline ? "online" : "offline"}
            </p>
            <label className="relative h-7 w-12 cursor-pointer">
              <input
                checked={isOnline}
                onChange={(e) => setIsOnline(e.target.checked)}
                className="peer sr-only"
                type="checkbox"
              />
              <div className="h-full w-full rounded-full bg-[#22C55E] transition-colors peer-checked:bg-[#22C55E]"></div>
              <div className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-full"></div>
            </label>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-[#F7F7F7]">
        <div className="p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-[#1A1A1A]">
              Good Morning, {user?.name || "Driver"}
            </h1>
            <p className="text-[#5C5C5C]">
              Here are the available rides in your area.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                <h2 className="mb-4 text-xl font-bold text-[#1A1A1A]">
                  Available Ride Requests
                </h2>
                {loading ? (
                  <p className="text-sm text-[#5C5C5C]">Loading rides...</p>
                ) : availableRides.length === 0 ? (
                  <p className="text-sm text-[#5C5C5C]">
                    No ride requests available at the moment.
                  </p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {availableRides.map((ride) => (
                      <div
                        key={ride.id}
                        className="flex flex-col items-start gap-4 rounded-lg border border-[#E5E5E5] p-4 transition-colors duration-200 hover:bg-gray-50 sm:flex-row sm:items-center"
                      >
                        <div className="grow space-y-3">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-green-500">
                              trip_origin
                            </span>
                            <p className="text-[#1A1A1A]">
                              {ride.pickupLocation}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-red-500">
                              location_on
                            </span>
                            <p className="text-[#1A1A1A]">
                              {ride.dropLocation}
                            </p>
                          </div>
                          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#5C5C5C]">
                            <div className="flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-sm">
                                schedule
                              </span>
                              <span>{formatTime(ride.rideTime)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex w-full gap-2 self-stretch sm:w-auto sm:flex-col">
                          <button
                            onClick={() => handleAcceptRide(ride.id)}
                            disabled={accepting === ride.id}
                            className="flex-1 rounded-lg bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] disabled:opacity-50"
                          >
                            {accepting === ride.id ? "Accepting..." : "Accept"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-8 lg:col-span-1">
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2 rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                    <p className="text-base font-medium leading-normal text-[#5C5C5C]">
                      Today&apos;s Earnings
                    </p>
                    <p className="text-2xl font-bold leading-tight tracking-tight text-[#1A1A1A]">
                      ${todaysEarnings.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                    <p className="text-base font-medium leading-normal text-[#5C5C5C]">
                      Rides Completed
                    </p>
                    <p className="text-2xl font-bold leading-tight tracking-tight text-[#1A1A1A]">
                      {completed.length}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                    <p className="text-base font-medium leading-normal text-[#5C5C5C]">
                      Online Hours
                    </p>
                    <p className="text-2xl font-bold leading-tight tracking-tight text-[#1A1A1A]">
                      {onlineHours}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                    <p className="text-base font-medium leading-normal text-[#5C5C5C]">
                      Acceptance Rate
                    </p>
                    <p className="text-2xl font-bold leading-tight tracking-tight text-[#1A1A1A]">
                      {acceptanceRate}%
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="pb-3 text-[22px] font-bold leading-tight tracking-[-0.015em] text-[#1A1A1A]">
                  Recent Trips
                </h2>
                {completed.length === 0 ? (
                  <p className="text-sm text-[#5C5C5C]">
                    No completed rides yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {completed.slice(0, 4).map((ride) => (
                      <div
                        key={ride.id}
                        className="flex cursor-pointer items-center gap-4 rounded-lg border border-transparent bg-white p-4 transition-colors duration-200 hover:border-[#E5E5E5]"
                      >
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#F7F7F7] text-[#1A1A1A]">
                          <span className="material-symbols-outlined">
                            route
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="truncate text-base font-medium leading-normal text-[#1A1A1A]">
                            {ride.pickupLocation} to {ride.dropLocation}
                          </p>
                          <p className="text-sm text-[#5C5C5C]">
                            {formatTime(ride.rideTime)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function DriverDashboardWrapper() {
  return (
    <ProtectedRoute requiredRole="DRIVER">
      <DriverDashboard />
    </ProtectedRoute>
  );
}

export { DriverDashboardWrapper as default };
