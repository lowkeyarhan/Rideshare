"use client";

import React, { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import SidebarP from "@/src/components/sidebarP";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import { createRideRequest, fetchUserRides } from "@/src/libs/userDashboardApi";
import { getStoredUser, clearAuth } from "@/src/libs/auth";
import type { Ride, User } from "@/src/libs/types";

function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [requestLoading, setRequestLoading] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("Current Location");
  const [dropLocation, setDropLocation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const currentUser = getStoredUser();
    if (!currentUser) {
      return;
    }

    setUser(currentUser);

    const loadRides = async () => {
      try {
        const data = await fetchUserRides(currentUser.id);
        setRides(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load your rides right now.");
      } finally {
        setLoading(false);
      }
    };

    loadRides();
  }, []);

  const logout = () => {
    clearAuth();
    router.push("/auth");
  };

  const handleRequestRide = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) {
      return;
    }

    if (!pickupLocation.trim() || !dropLocation.trim()) {
      setError("Please fill in both locations.");
      return;
    }

    setRequestLoading(true);
    setError("");
    setSuccess("");

    try {
      await createRideRequest({
        userId: user.id,
        pickupLocation,
        dropLocation,
        status: "REQUESTED",
      });
      setSuccess("Ride requested successfully!");
      setDropLocation("");
      const data = await fetchUserRides(user.id);
      setRides(data);
    } catch (err) {
      const fallback =
        (err as { response?: { data?: string } })?.response?.data ??
        "Unable to request ride.";
      setError(typeof fallback === "string" ? fallback : "Please try again.");
    } finally {
      setRequestLoading(false);
    }
  };

  const formatTime = (rideTime?: string) => {
    if (!rideTime) {
      return "Awaiting driver";
    }
    return new Date(rideTime).toLocaleString();
  };

  return (
    <div className="bg-background text-primary font-display">
      <div className="flex min-h-screen w-full">
        <SidebarP
          name={user?.name}
          subtitle={user ? user.username : ""}
          onLogout={logout}
        />

        <main className="flex-1 overflow-y-auto bg-[#F7F7F7] p-8">
          <div className="mx-auto max-w-7xl">
            <header className="mb-8">
              <div className="mb-6 flex flex-col gap-2">
                <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-[#141414]">
                  {user ? `Hello, ${user.name}!` : "Loading..."}
                </h1>
                <p className="text-base leading-normal text-[#707070]">
                  {loading
                    ? "Checking your recent rides"
                    : `You have ${rides.length} ride${
                        rides.length === 1 ? "" : "s"
                      } in your history.`}
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <form
                  className="flex flex-col gap-4 md:flex-row md:items-end"
                  onSubmit={handleRequestRide}
                >
                  <div className="flex flex-1 flex-col gap-4">
                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-[#141414]">
                        Pickup location
                      </span>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#707070]">
                          my_location
                        </span>
                        <input
                          className="w-full rounded-lg bg-[#F7F7F7] px-10 py-3 text-[#141414] placeholder-[#707070] focus:outline-none focus:ring-2 focus:ring-[#141414]"
                          placeholder="Enter pickup location"
                          type="text"
                          value={pickupLocation}
                          onChange={(event) =>
                            setPickupLocation(event.target.value)
                          }
                        />
                      </div>
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-[#141414]">
                        Destination
                      </span>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#707070]">
                          location_on
                        </span>
                        <input
                          className="w-full rounded-lg bg-[#F7F7F7] px-10 py-3 text-[#141414] placeholder-[#707070] focus:outline-none focus:ring-2 focus:ring-[#141414]"
                          placeholder="Where to?"
                          type="text"
                          value={dropLocation}
                          onChange={(event) =>
                            setDropLocation(event.target.value)
                          }
                        />
                      </div>
                    </label>
                  </div>

                  <button
                    className="flex h-[92px] min-w-[140px] cursor-pointer items-center justify-center rounded-lg bg-[#141414] px-6 text-base font-medium text-white transition-colors hover:bg-opacity-90 disabled:opacity-50"
                    type="submit"
                    disabled={requestLoading}
                  >
                    {requestLoading ? "Requesting..." : "Find Ride"}
                  </button>
                </form>

                {(error || success) && (
                  <p
                    className={`mt-4 text-sm ${
                      error ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {error || success}
                  </p>
                )}
              </div>
            </header>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="flex flex-col gap-8 lg:col-span-2">
                <div className="rounded-xl bg-white p-6">
                  <p className="mb-4 text-lg font-bold leading-tight tracking-[-0.015em] text-[#141414]">
                    Your Rides
                  </p>
                  {loading ? (
                    <p className="text-sm text-[#707070]">
                      Loading ride data...
                    </p>
                  ) : rides.length === 0 ? (
                    <p className="text-sm text-[#707070]">
                      Request a ride to see it here.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {rides.map((ride) => (
                        <div
                          key={ride.id}
                          className="rounded-lg border border-[#E5E5E5] p-4"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <p className="text-sm font-medium text-[#141414]">
                                {ride.pickupLocation}
                              </p>
                              <p className="text-sm font-medium text-[#141414]">
                                → {ride.dropLocation}
                              </p>
                              <p className="text-xs text-[#707070]">
                                {formatTime(ride.rideTime)}
                              </p>
                            </div>
                            <span className="rounded-full bg-[#F7F7F7] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#141414]">
                              {ride.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <div className="rounded-xl bg-white p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-lg font-bold leading-tight tracking-[-0.015em] text-[#141414]">
                      Ride History
                    </p>
                    <span className="text-sm text-[#707070]">
                      {rides.length} total
                    </span>
                  </div>
                  {rides.length === 0 ? (
                    <p className="text-sm text-[#707070]">
                      Nothing to show yet.
                    </p>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {rides.slice(0, 4).map((ride) => (
                        <div
                          key={ride.id}
                          className="flex items-center gap-4 rounded-lg bg-[#F7F7F7] p-3"
                        >
                          <div className="flex size-10 items-center justify-center rounded-lg bg-white">
                            <span className="material-symbols-outlined text-[#141414]">
                              directions_car
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-[#141414]">
                              {ride.pickupLocation} → {ride.dropLocation}
                            </p>
                            <p className="text-xs text-[#707070]">
                              {formatTime(ride.rideTime)}
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-[#141414]">
                            {ride.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="rounded-xl bg-white p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-lg font-bold leading-tight tracking-[-0.015em] text-[#141414]">
                      Account
                    </p>
                    <span className="text-xs uppercase tracking-wide text-[#707070]">
                      {user?.role ?? "RIDER"}
                    </span>
                  </div>
                  <div className="space-y-3 text-sm text-[#141414]">
                    <div className="flex justify-between">
                      <span>User name</span>
                      <span className="font-semibold">{user?.username}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Account ID</span>
                      <span className="font-semibold wrap-break-word">
                        {user?.id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function PassengerDashboardWrapper() {
  return (
    <ProtectedRoute requiredRole="RIDER">
      <Dashboard />
    </ProtectedRoute>
  );
}
