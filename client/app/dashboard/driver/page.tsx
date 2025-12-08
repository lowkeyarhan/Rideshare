import React from "react";
import SidebarD from "@/src/components/sidebarD";

export default function DriverDashboard() {
  return (
    <div className="bg-background font-display text-primary">
      <div className="relative flex min-h-screen w-full">
        <SidebarD />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#F7F7F7]">
          <div className="p-8">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-[#1A1A1A]">
                Good Morning, John
              </h1>
              <p className="text-[#5C5C5C]">
                Here are the available rides in your area.
              </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Available Rides */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-6">
                  <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">
                    Available Ride Requests
                  </h2>
                  <div className="flex flex-col gap-4">
                    {/* Ride Request 1 */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg border border-[#E5E5E5] hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex-grow space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-green-500">
                            trip_origin
                          </span>
                          <p className="text-[#1A1A1A]">123 Main St, Anytown</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-red-500">
                            location_on
                          </span>
                          <p className="text-[#1A1A1A]">
                            456 Oak Ave, Somecity
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#5C5C5C] mt-2">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm">
                              payments
                            </span>
                            <span>~$15.75</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm">
                              route
                            </span>
                            <span>5.2 miles</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm">
                              schedule
                            </span>
                            <span>15 min</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex sm:flex-col gap-2 w-full sm:w-auto self-stretch">
                        <button className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#2563EB] text-white font-semibold hover:bg-[#1D4ED8] transition-colors flex-1 text-sm cursor-pointer">
                          Accept
                        </button>
                        <button className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#F1F5F9] text-[#64748B] font-semibold hover:bg-[#E2E8F0] transition-colors flex-1 text-sm cursor-pointer">
                          Decline
                        </button>
                      </div>
                    </div>

                    {/* Ride Request 2 */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg border border-[#E5E5E5] hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex-grow space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-green-500">
                            trip_origin
                          </span>
                          <p className="text-[#1A1A1A]">
                            City Airport (Terminal B)
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-red-500">
                            location_on
                          </span>
                          <p className="text-[#1A1A1A]">Grand Hyatt Hotel</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#5C5C5C] mt-2">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm">
                              payments
                            </span>
                            <span>~$28.50</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm">
                              route
                            </span>
                            <span>12.8 miles</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm">
                              schedule
                            </span>
                            <span>30 min</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex sm:flex-col gap-2 w-full sm:w-auto self-stretch">
                        <button className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#2563EB] text-white font-semibold hover:bg-[#1D4ED8] transition-colors flex-1 text-sm cursor-pointer">
                          Accept
                        </button>
                        <button className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#F1F5F9] text-[#64748B] font-semibold hover:bg-[#E2E8F0] transition-colors flex-1 text-sm cursor-pointer">
                          Decline
                        </button>
                      </div>
                    </div>

                    {/* Ride Request 3 */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg border border-[#E5E5E5] hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex-grow space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-green-500">
                            trip_origin
                          </span>
                          <p className="text-[#1A1A1A]">
                            Westfield Shopping Mall
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-red-500">
                            location_on
                          </span>
                          <p className="text-[#1A1A1A]">Northwood Suburbs</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#5C5C5C] mt-2">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm">
                              payments
                            </span>
                            <span>~$11.20</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm">
                              route
                            </span>
                            <span>3.5 miles</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm">
                              schedule
                            </span>
                            <span>12 min</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex sm:flex-col gap-2 w-full sm:w-auto self-stretch">
                        <button className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#2563EB] text-white font-semibold hover:bg-[#1D4ED8] transition-colors flex-1 text-sm cursor-pointer">
                          Accept
                        </button>
                        <button className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#F1F5F9] text-[#64748B] font-semibold hover:bg-[#E2E8F0] transition-colors flex-1 text-sm cursor-pointer">
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Stats and History */}
              <div className="lg:col-span-1 space-y-8">
                {/* Stats Grid */}
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#E5E5E5] bg-[#FFFFFF] shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                      <p className="text-[#5C5C5C] text-base font-medium leading-normal">
                        Today's Earnings
                      </p>
                      <p className="text-[#1A1A1A] tracking-tight text-2xl font-bold leading-tight">
                        $125.50
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#E5E5E5] bg-[#FFFFFF] shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                      <p className="text-[#5C5C5C] text-base font-medium leading-normal">
                        Rides Completed
                      </p>
                      <p className="text-[#1A1A1A] tracking-tight text-2xl font-bold leading-tight">
                        12
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#E5E5E5] bg-[#FFFFFF] shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                      <p className="text-[#5C5C5C] text-base font-medium leading-normal">
                        Online Hours
                      </p>
                      <p className="text-[#1A1A1A] tracking-tight text-2xl font-bold leading-tight">
                        6.5
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#E5E5E5] bg-[#FFFFFF] shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                      <p className="text-[#5C5C5C] text-base font-medium leading-normal">
                        Acceptance Rate
                      </p>
                      <p className="text-[#1A1A1A] tracking-tight text-2xl font-bold leading-tight">
                        95%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recent Trips */}
                <div>
                  <h2 className="text-[#1A1A1A] text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
                    Recent Trips
                  </h2>
                  <div className="space-y-2">
                    <div className="flex items-center gap-4 bg-[#FFFFFF] p-4 rounded-lg border border-transparent hover:border-[#E5E5E5] cursor-pointer transition-colors duration-200">
                      <div className="text-[#1A1A1A] flex items-center justify-center rounded-lg bg-[#F7F7F7] shrink-0 size-10">
                        <span className="material-symbols-outlined">route</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-[#1A1A1A] text-base font-medium leading-normal truncate">
                          123 Main St to City Center
                        </p>
                        <p className="text-sm text-[#5C5C5C]">10:45 AM</p>
                      </div>
                      <p className="text-[#1A1A1A] text-base font-semibold">
                        $12.30
                      </p>
                    </div>
                    <div className="flex items-center gap-4 bg-[#FFFFFF] p-4 rounded-lg border border-transparent hover:border-[#E5E5E5] cursor-pointer transition-colors duration-200">
                      <div className="text-[#1A1A1A] flex items-center justify-center rounded-lg bg-[#F7F7F7] shrink-0 size-10">
                        <span className="material-symbols-outlined">route</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-[#1A1A1A] text-base font-medium leading-normal truncate">
                          Airport Rd to Grand Hotel
                        </p>
                        <p className="text-sm text-[#5C5C5C]">09:12 AM</p>
                      </div>
                      <p className="text-[#1A1A1A] text-base font-semibold">
                        $25.50
                      </p>
                    </div>
                    <div className="flex items-center gap-4 bg-[#FFFFFF] p-4 rounded-lg border border-transparent hover:border-[#E5E5E5] cursor-pointer transition-colors duration-200">
                      <div className="text-[#1A1A1A] flex items-center justify-center rounded-lg bg-[#F7F7F7] shrink-0 size-10">
                        <span className="material-symbols-outlined">route</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-[#1A1A1A] text-base font-medium leading-normal truncate">
                          789 Pine Ln to West Mall
                        </p>
                        <p className="text-sm text-[#5C5C5C]">08:30 AM</p>
                      </div>
                      <p className="text-[#1A1A1A] text-base font-semibold">
                        $9.75
                      </p>
                    </div>
                    <div className="flex items-center gap-4 bg-[#FFFFFF] p-4 rounded-lg border border-transparent hover:border-[#E5E5E5] cursor-pointer transition-colors duration-200">
                      <div className="text-[#1A1A1A] flex items-center justify-center rounded-lg bg-[#F7F7F7] shrink-0 size-10">
                        <span className="material-symbols-outlined">route</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-[#1A1A1A] text-base font-medium leading-normal truncate">
                          Central Station to North Park
                        </p>
                        <p className="text-sm text-[#5C5C5C]">07:55 AM</p>
                      </div>
                      <p className="text-[#1A1A1A] text-base font-semibold">
                        $14.00
                      </p>
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
