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
    if (!currentUser) return;

    setUser(currentUser);
    fetchUserRides()
      .then((data) => {
        console.log("Loaded rides:", data);
        setRides(data);
      })
      .catch((error) => {
        console.error("Error loading rides:", error);
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          setError("Session expired. Please log in again.");
        } else {
          setError("Unable to load your rides right now.");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = () => (clearAuth(), router.push("/auth"));

  const handleRequestRide = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user || !pickupLocation.trim() || !dropLocation.trim()) {
      setError("Please fill in both locations.");
      return;
    }

    setRequestLoading(true);
    setError("");
    setSuccess("");

    try {
      await createRideRequest({ pickupLocation, dropLocation });
      setSuccess("Ride requested successfully!");
      setDropLocation("");
      setRides(await fetchUserRides());
    } catch (err) {
      const errorMsg = (err as { response?: { data?: string } })?.response
        ?.data;
      setError(
        typeof errorMsg === "string" ? errorMsg : "Unable to request ride."
      );
    } finally {
      setRequestLoading(false);
    }
  };

  const formatTime = (createdAt?: string) => {
    if (!createdAt) {
      return "Just now";
    }
    return new Date(createdAt).toLocaleString();
  };

  const requestedCount = rides.filter(
    (ride) => ride.status === "REQUESTED"
  ).length;
  const completedCount = rides.filter(
    (ride) => ride.status === "COMPLETED"
  ).length;

  const getStatusBadgeClasses = (status: Ride["status"]) => {
    if (status === "REQUESTED") return "bg-yellow-100 text-[#AA6C00]";
    if (status === "COMPLETED") return "bg-green-100 text-[#0F8A3C]";
    return "bg-blue-100 text-[#1D4ED8]";
  };

  return (
    <div className="bg-[#FFFFFF] text-[#141414] font-display">
      <div className="flex min-h-screen w-full">
        <SidebarP
          name={user?.name}
          subtitle={user ? user.username : ""}
          onLogout={logout}
        />

        <main className="flex-1 overflow-y-auto bg-[#F7F7F7] p-8">
          <div className="mx-auto max-w-7xl">
            <header className="mb-8">
              <div className="mb-6 flex flex-col gap-1">
                <h1 className="text-3xl font-bold leading-tight tracking-tight">
                  {user ? `Hello, ${user.name}!` : "Hello, Alex!"}
                </h1>
                <p className="text-base text-[#707070]">
                  Ready to go somewhere?
                </p>
              </div>
              <div className="rounded-xl bg-[#FFFFFF] p-6 shadow-sm">
                <form
                  className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
                  onSubmit={handleRequestRide}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex flex-col items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#141414]" />
                      <span className="w-px h-10 bg-[#E5E5E5]" />
                      <span className="w-3 h-3 bg-[#141414]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col gap-4">
                        <div>
                          <label className="text-xs font-medium text-[#707070]">
                            Pickup location
                          </label>
                          <div className="mt-1.5 flex items-center gap-3">
                            <span className="material-symbols-outlined text-neutral-default text-xl">
                              my_location
                            </span>
                            <input
                              className="w-full rounded-md border border-transparent bg-[#F7F7F7] px-3 py-2 text-base font-medium text-[#141414] focus:border-[#141414] focus:outline-none"
                              type="text"
                              value={pickupLocation}
                              onChange={(event) =>
                                setPickupLocation(event.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-[#707070]">
                            Destination
                          </label>
                          <div className="mt-1.5 flex items-center gap-3">
                            <span className="material-symbols-outlined text-neutral-default text-xl">
                              location_on
                            </span>
                            <input
                              className="w-full rounded-md border border-transparent bg-[#F7F7F7] px-3 py-2 text-base font-medium text-[#141414] focus:border-[#141414] focus:outline-none"
                              type="text"
                              placeholder="Where to?"
                              value={dropLocation}
                              onChange={(event) =>
                                setDropLocation(event.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="flex h-14 min-w-[140px] items-center justify-center rounded-lg bg-[#141414] px-6 text-base font-semibold text-white transition-colors hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap"
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
                <div className="rounded-xl bg-[#FFFFFF] p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold leading-tight">
                      Your Rides
                    </h2>
                    <button className="text-sm font-semibold text-[#141414] hover:underline">
                      View All
                    </button>
                  </div>
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
                          className="flex items-center justify-between gap-4 border-b border-[#E5E5E5] pb-4 last:border-b-0 last:pb-0"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F7F7F7]">
                              <span className="material-symbols-outlined text-2xl text-[#141414]">
                                directions_car
                              </span>
                            </div>
                            <div>
                              <p className="text-base font-semibold text-[#141414]">
                                {ride.pickupLocation} → {ride.dropLocation}
                              </p>
                              <p className="text-sm text-[#707070]">
                                {formatTime(ride.createdAt)}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`text-sm font-semibold px-3 py-1 rounded-full ${getStatusBadgeClasses(
                              ride.status
                            )}`}
                          >
                            {ride.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <div className="rounded-xl bg-[#FFFFFF] p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold leading-tight">
                      Ride History
                    </h2>
                    <span className="text-sm text-[#707070]">
                      {rides.length} total
                    </span>
                  </div>
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <p className="text-base text-[#707070]">
                        Completed Rides
                      </p>
                      <p className="text-base font-bold text-[#141414]">
                        {completedCount}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-base text-[#707070]">
                        Requested Rides
                      </p>
                      <p className="text-base font-bold text-[#141414]">
                        {requestedCount}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-[#FFFFFF] p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl font-bold leading-tight">Account</h2>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-[#E5E5E5] text-[#707070]">
                      PASSENGER
                    </span>
                  </div>
                  <div className="flex flex-col gap-4 text-sm text-[#141414]">
                    <div className="flex items-center justify-between">
                      <span>User Name</span>
                      <span className="font-semibold">{user?.username}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Account ID</span>
                      <span className="font-semibold">
                        {user?.id?.slice(0, 4)}...{user?.id?.slice(-4)}
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
    <ProtectedRoute requiredRole="ROLE_USER">
      <Dashboard />
    </ProtectedRoute>
  );
}
