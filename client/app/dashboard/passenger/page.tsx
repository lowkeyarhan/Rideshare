"use client";

import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import SidebarP from "@/src/components/sidebarP";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import {
  createRideRequest,
  fetchUserRides,
  searchRides,
  filterRidesByDistance,
  sortRidesByFare,
  getUserSpending,
} from "@/src/libs/userDashboardApi";
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
  const [searchText, setSearchText] = useState("");
  const [minFare, setMinFare] = useState("");
  const [maxFare, setMaxFare] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [totalSpending, setTotalSpending] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);
  const hasLoadedData = useRef(false);

  useEffect(() => {
    if (hasLoadedData.current) return;
    const currentUser = getStoredUser();
    if (!currentUser) return;

    setUser(currentUser);
    hasLoadedData.current = true;

    // Load rides
    fetchUserRides()
      .then((ridesData) => {
        console.log("Loaded rides:", ridesData);
        setRides(ridesData);
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

    // Load spending separately
    getUserSpending(currentUser.id)
      .then((spendingData) => {
        setTotalSpending(spendingData.totalSpending || 0);
      })
      .catch((error) => {
        console.error("Error loading spending:", error);
        setTotalSpending(0);
      });
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

      const ridesData = await fetchUserRides();
      setRides(ridesData);

      // Update spending separately
      getUserSpending(user.id)
        .then((spendingData) =>
          setTotalSpending(spendingData.totalSpending || 0)
        )
        .catch(() => {});
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

  const handleSearch = async () => {
    if (!searchText.trim()) {
      const data = await fetchUserRides();
      setRides(data);
      setSuccess("");
      return;
    }
    try {
      setLoading(true);
      const data = await searchRides(searchText);
      setRides(data);
      setError("");
      setSuccess(
        data.length > 0
          ? `Found ${data.length} ride(s)`
          : "No rides found matching your search"
      );
    } catch (err) {
      console.error("Search error:", err);
      setError("Unable to search rides. Please try again.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterByFare = async () => {
    if (!minFare || !maxFare) {
      setError("Please enter both min and max fare");
      setSuccess("");
      return;
    }
    const min = parseFloat(minFare);
    const max = parseFloat(maxFare);
    if (isNaN(min) || isNaN(max) || min < 0 || max < min) {
      setError("Please enter valid fare range (min must be less than max)");
      setSuccess("");
      return;
    }
    try {
      setLoading(true);
      const data = await filterRidesByDistance(min, max);
      setRides(data);
      setError("");
      setSuccess(
        data.length > 0
          ? `Found ${data.length} ride(s) with fare between $${min} and $${max}`
          : "No rides found in this fare range"
      );
    } catch (err) {
      console.error("Filter error:", err);
      setError("Unable to filter rides. Please try again.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = async () => {
    try {
      setLoading(true);
      const data = await sortRidesByFare(sortOrder);
      setRides(data);
      setError("");
      setSuccess(
        `Sorted ${data.length} ride(s) by fare (${
          sortOrder === "asc" ? "low to high" : "high to low"
        })`
      );
    } catch (err) {
      console.error("Sort error:", err);
      setError("Unable to sort rides. Please try again.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = async () => {
    setSearchText("");
    setMinFare("");
    setMaxFare("");
    setSortOrder("desc");
    try {
      setLoading(true);
      const data = await fetchUserRides();
      setRides(data);
      setError("");
      setSuccess("Filters reset - showing all rides");
    } catch (err) {
      console.error("Reset error:", err);
      setError("Unable to reset filters. Please try again.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (createdAt?: string) => {
    if (!createdAt) {
      return "Just now";
    }
    return new Date(createdAt).toLocaleString();
  };

  const { requestedCount, acceptedCount, completedCount } = useMemo(
    () => ({
      requestedCount: rides.filter((ride) => ride.status === "REQUESTED")
        .length,
      acceptedCount: rides.filter((ride) => ride.status === "ACCEPTED").length,
      completedCount: rides.filter((ride) => ride.status === "COMPLETED")
        .length,
    }),
    [rides]
  );

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
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="text-sm font-semibold text-[#141414] hover:underline flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showFilters ? "expand_less" : "tune"}
                      </span>
                      {showFilters ? "Hide Filters" : "Filters"}
                    </button>
                  </div>

                  {showFilters && (
                    <div className="mb-6 space-y-4 border-b border-[#E5E5E5] pb-6">
                      <div className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[200px]">
                          <label className="text-xs font-medium text-[#707070] mb-1.5 block">
                            Search Location
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Search pickup or drop..."
                              value={searchText}
                              onChange={(e) => setSearchText(e.target.value)}
                              className="flex-1 rounded-md border border-[#E5E5E5] bg-[#F7F7F7] px-3 py-2 text-sm focus:border-[#141414] focus:outline-none"
                            />
                            <button
                              onClick={handleSearch}
                              className="px-4 py-2 bg-[#141414] text-white text-sm font-semibold rounded-md hover:bg-opacity-90"
                            >
                              Search
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <div className="flex gap-2 items-end">
                          <div>
                            <label className="text-xs font-medium text-[#707070] mb-1.5 block">
                              Min Fare ($)
                            </label>
                            <input
                              type="number"
                              placeholder="0"
                              value={minFare}
                              onChange={(e) => setMinFare(e.target.value)}
                              className="w-24 rounded-md border border-[#E5E5E5] bg-[#F7F7F7] px-3 py-2 text-sm focus:border-[#141414] focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-[#707070] mb-1.5 block">
                              Max Fare ($)
                            </label>
                            <input
                              type="number"
                              placeholder="100"
                              value={maxFare}
                              onChange={(e) => setMaxFare(e.target.value)}
                              className="w-24 rounded-md border border-[#E5E5E5] bg-[#F7F7F7] px-3 py-2 text-sm focus:border-[#141414] focus:outline-none"
                            />
                          </div>
                          <button
                            onClick={handleFilterByFare}
                            className="px-4 py-2 bg-[#141414] text-white text-sm font-semibold rounded-md hover:bg-opacity-90"
                          >
                            Filter
                          </button>
                        </div>

                        <div className="flex gap-2 items-end">
                          <div>
                            <label className="text-xs font-medium text-[#707070] mb-1.5 block">
                              Sort by Fare
                            </label>
                            <select
                              value={sortOrder}
                              onChange={(e) =>
                                setSortOrder(e.target.value as "asc" | "desc")
                              }
                              className="rounded-md border border-[#E5E5E5] bg-[#F7F7F7] px-3 py-2 text-sm focus:border-[#141414] focus:outline-none"
                            >
                              <option value="asc">Low to High</option>
                              <option value="desc">High to Low</option>
                            </select>
                          </div>
                          <button
                            onClick={handleSort}
                            className="px-4 py-2 bg-[#141414] text-white text-sm font-semibold rounded-md hover:bg-opacity-90"
                          >
                            Sort
                          </button>
                        </div>

                        <button
                          onClick={handleResetFilters}
                          className="px-4 py-2 bg-[#F7F7F7] text-[#141414] text-sm font-semibold rounded-md hover:bg-[#E5E5E5] self-end"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  )}
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
                          className="flex items-start justify-between gap-4 border-b border-[#E5E5E5] pb-4 last:border-b-0 last:pb-0"
                        >
                          <div className="flex items-start gap-4 flex-1">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F7F7F7] shrink-0">
                              <span className="material-symbols-outlined text-2xl text-[#141414]">
                                directions_car
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-base font-semibold text-[#141414]">
                                {ride.pickupLocation} → {ride.dropLocation}
                              </p>
                              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                                <p className="text-sm text-[#707070]">
                                  {formatTime(
                                    ride.requestedAt || ride.createdAt
                                  )}
                                </p>
                                {ride.distance > 0 && (
                                  <p className="text-sm text-[#707070]">
                                    {ride.distance.toFixed(1)} km
                                  </p>
                                )}
                                {ride.fare > 0 && (
                                  <p className="text-sm font-semibold text-[#141414]">
                                    ${ride.fare.toFixed(2)}
                                  </p>
                                )}
                              </div>
                              {ride.driverUsername && (
                                <p className="text-xs text-[#707070] mt-1">
                                  Driver: {ride.driverUsername}
                                </p>
                              )}
                            </div>
                          </div>
                          <span
                            className={`text-sm font-semibold px-3 py-1 rounded-full whitespace-nowrap ${getStatusBadgeClasses(
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
                      <p className="text-base text-[#707070]">Accepted Rides</p>
                      <p className="text-base font-bold text-[#141414]">
                        {acceptedCount}
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
                    <div className="flex items-center justify-between pt-4 border-t border-[#E5E5E5]">
                      <p className="text-base text-[#707070]">Total Spending</p>
                      <p className="text-base font-bold text-[#141414]">
                        ${totalSpending.toFixed(2)}
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
