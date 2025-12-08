"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getStoredUser } from "@/src/libs/auth";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      const user = getStoredUser();
      if (user?.role === "DRIVER") {
        router.push("/dashboard/driver");
      } else {
        router.push("/dashboard/passenger");
      }
    }
  }, [router]);
  return (
    <div className="bg-background font-display text-primary">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="flex h-full grow flex-col">
          <div className="px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
            <div className="flex flex-col w-full max-w-6xl flex-1">
              <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e5e7eb] px-6 md:px-10 py-4">
                <div className="flex items-center gap-4 text-[#111827]">
                  <div className="size-6">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_6_543)">
                        <path
                          d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"
                          fill="currentColor"
                        />
                        <path
                          clipRule="evenodd"
                          d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z"
                          fill="currentColor"
                          fillRule="evenodd"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_6_543">
                          <rect fill="white" height="48" width="48" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <h2 className="text-[#111827] text-xl font-bold leading-tight tracking-[-0.015em]">
                    RideShare
                  </h2>
                </div>
                <div className="flex flex-1 justify-end gap-8">
                  <div className="hidden md:flex items-center gap-9">
                    <a
                      className="text-[#111827] text-sm font-medium leading-normal hover:opacity-80 transition-opacity"
                      href="#"
                    >
                      Ride
                    </a>
                    <a
                      className="text-[#111827] text-sm font-medium leading-normal hover:opacity-80 transition-opacity"
                      href="#"
                    >
                      Drive
                    </a>
                    <a
                      className="text-[#111827] text-sm font-medium leading-normal hover:opacity-80 transition-opacity"
                      href="#"
                    >
                      Business
                    </a>
                  </div>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f3f4f6] text-[#111827] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#e5e7eb] transition-colors">
                    <span className="truncate">Sign Up</span>
                  </button>
                </div>
              </header>
              <main className="flex-1">
                <div className="@container py-16 md:py-24">
                  <div className="@[480px]:p-4">
                    <div
                      className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 rounded-xl items-center text-center justify-center px-4 pb-10 @[480px]:px-10"
                      data-alt="Abstract image of blurred city lights at night, creating a sophisticated and modern background."
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCy7X0GM_thuEbMlVdHcQtnzdXqVhemtbQvTq83BgwrPt-nTbv1Uo-NlTH0X2jv_eIM-tDHRmbdOVSwJJ3AERFX162GKcRAuhnJw-lTz6c6SPw_98qIRgx9xlLxh44HnjTzMHUCNMZm1GPLFwhLdWinw3BcVN5MiN16ikPztVdMhoOZT6eWDHJzRzFZxfw9WNVkLnn80j6L2i-ikBC2OSwL_SpiSdr45pU-Zka7T8Xf37oalu1somaJS2dS9d_1iR_YaWRq-xQaUFA")',
                      }}
                    >
                      <div className="flex flex-col gap-4 text-center items-center">
                        <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-6xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-2xl">
                          Your Destination, Redefined.
                        </h1>
                        <h2 className="text-white/90 text-base font-normal leading-normal @[480px]:text-lg @[480px]:font-normal @[480px]:leading-normal">
                          Request a ride, hop in, and go.
                        </h2>
                      </div>
                      <div className="flex flex-col gap-2 w-full max-w-xl bg-[#ffffff]/80 backdrop-blur-sm p-4 rounded-xl border border-[#e5e7eb]">
                        <label className="flex flex-col min-w-40 h-14 w-full">
                          <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                            <div className="text-[#6b7280] flex border border-[#e5e7eb] bg-[#ffffff] items-center justify-center pl-4 rounded-l-lg border-r-0">
                              <span className="material-symbols-outlined">
                                search
                              </span>
                            </div>
                            <input
                              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden text-[#111827] focus:outline-0 focus:ring-0 border border-[#e5e7eb] bg-[#ffffff] focus:border-[#111827]/50 h-full placeholder:text-[#6b7280] px-4 rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal"
                              placeholder="Enter pickup location"
                              defaultValue=""
                            />
                          </div>
                        </label>
                        <label className="flex flex-col min-w-40 h-14 w-full">
                          <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                            <div className="text-[#6b7280] flex border border-[#e5e7eb] bg-[#ffffff] items-center justify-center pl-4 rounded-l-lg border-r-0">
                              <span className="material-symbols-outlined">
                                pin_drop
                              </span>
                            </div>
                            <input
                              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111827] focus:outline-0 focus:ring-0 border border-[#e5e7eb] bg-[#ffffff] focus:border-[#111827]/50 h-full placeholder:text-[#6b7280] px-4 rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal"
                              placeholder="Enter destination"
                              defaultValue=""
                            />
                          </div>
                        </label>
                        <button className="flex w-full mt-2 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#111827] text-[#ffffff] text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#111827]/90 transition-colors">
                          <span className="truncate">Request a ride</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-10 px-4 py-16 @container">
                  <div className="flex flex-col items-start gap-6">
                    <div className="flex flex-col gap-4">
                      <h1 className="text-[#111827] tracking-tight text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
                        The RideShare Experience
                      </h1>
                      <p className="text-[#6b7280] text-base font-normal leading-normal max-w-[720px]">
                        Travel with peace of mind and in unparalleled comfort.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex flex-1 gap-4 rounded-xl border border-[#e5e7eb] bg-[#f3f4f6] p-6 flex-col">
                      <div className="text-[#111827]">
                        <span className="material-symbols-outlined text-3xl!">
                          shield
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h2 className="text-[#111827] text-lg font-bold leading-tight">
                          Safety First
                        </h2>
                        <p className="text-[#6b7280] text-sm font-normal leading-normal">
                          Our commitment to your safety is our top priority,
                          with advanced features and trained drivers.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-1 gap-4 rounded-xl border border-[#e5e7eb] bg-[#f3f4f6] p-6 flex-col">
                      <div className="text-[#111827]">
                        <span className="material-symbols-outlined text-3xl!">
                          directions_car
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h2 className="text-[#111827] text-lg font-bold leading-tight">
                          Premium Fleet
                        </h2>
                        <p className="text-[#6b7280] text-sm font-normal leading-normal">
                          Choose from our exclusive selection of high-end
                          vehicles for the ultimate travel experience.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-1 gap-4 rounded-xl border border-[#e5e7eb] bg-[#f3f4f6] p-6 flex-col">
                      <div className="text-[#111827]">
                        <span className="material-symbols-outlined text-3xl!">
                          receipt_long
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h2 className="text-[#111827] text-lg font-bold leading-tight">
                          Transparent Pricing
                        </h2>
                        <p className="text-[#6b7280] text-sm font-normal leading-normal">
                          Know your fare before you book. No surprises, just
                          fair, upfront pricing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-16">
                  <div className="flex flex-col items-center text-center mb-12">
                    <h1 className="text-[#111827] tracking-tight text-[32px] font-bold leading-tight md:text-4xl md:font-black md:leading-tight md:tracking-[-0.033em] max-w-[720px]">
                      How It Works
                    </h1>
                    <p className="text-[#6b7280] text-base font-normal leading-normal max-w-[720px] mt-4">
                      Simple steps to get you on your way.
                    </p>
                  </div>
                  <div className="grid grid-cols-[40px_1fr] gap-x-4 max-w-md mx-auto">
                    <div className="flex flex-col items-center gap-2 pt-3">
                      <div className="text-[#111827] p-2 bg-[#f3f4f6] rounded-full border border-[#e5e7eb]">
                        <span className="material-symbols-outlined">
                          pin_drop
                        </span>
                      </div>
                      <div className="w-1 bg-[#6b7280] h-full grow"></div>
                    </div>
                    <div className="flex flex-1 flex-col pb-10 pt-3">
                      <p className="text-[#111827] text-lg font-bold leading-normal">
                        1. Set Destination
                      </p>
                      <p className="text-[#6b7280] text-base font-normal leading-normal mt-1">
                        Enter your destination and see your route.
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-1 bg-[#6b7280] h-full grow"></div>
                      <div className="text-[#111827] p-2 bg-[#f3f4f6] rounded-full border border-[#e5e7eb]">
                        <span className="material-symbols-outlined">
                          directions_car
                        </span>
                      </div>
                      <div className="w-1 bg-[#6b7280] h-full grow"></div>
                    </div>
                    <div className="flex flex-1 flex-col pb-10">
                      <p className="text-[#111827] text-lg font-bold leading-normal">
                        2. Choose Your Ride
                      </p>
                      <p className="text-[#6b7280] text-base font-normal leading-normal mt-1">
                        Select the perfect vehicle from our premium fleet.
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-2 pb-3">
                      <div className="w-1 bg-[#6b7280] h-full grow"></div>
                      <div className="text-[#111827] p-2 bg-[#f3f4f6] rounded-full border border-[#e5e7eb]">
                        <span className="material-symbols-outlined">trip</span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col">
                      <p className="text-[#111827] text-lg font-bold leading-normal">
                        3. Travel in Style
                      </p>
                      <p className="text-[#6b7280] text-base font-normal leading-normal mt-1">
                        Meet your driver and enjoy a seamless journey.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="@container py-16">
                  <div className="flex flex-col items-center justify-center gap-6 px-4 py-10 @[480px]:gap-8 @[480px]:px-10 @[480px]:py-20 rounded-xl bg-[#f3f4f6] border border-[#e5e7eb]">
                    <div className="flex flex-col gap-3 text-center items-center">
                      <h1 className="text-[#111827] tracking-tight text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
                        Get behind the wheel
                      </h1>
                      <p className="text-[#6b7280] text-base font-normal leading-normal max-w-lg">
                        Join our community of professional drivers and start
                        earning on your schedule.
                      </p>
                    </div>
                    <div className="flex flex-1 justify-center">
                      <div className="flex justify-center">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#111827] text-[#ffffff] text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#111827]/90 transition-colors">
                          <span className="truncate">Drive with RideShare</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
              <footer className="border-t border-[#e5e7eb] mt-16 py-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
                  <div className="col-span-2 md:col-span-1">
                    <div className="flex items-center gap-3 text-[#111827]">
                      <div className="size-6">
                        <svg
                          fill="currentColor"
                          viewBox="0 0 48 48"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_6_543)">
                            <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" />
                            <path
                              clipRule="evenodd"
                              d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z"
                            />
                          </g>
                        </svg>
                      </div>
                      <h2 className="text-[#111827] text-xl font-bold leading-tight tracking-[-0.015em]">
                        RideShare
                      </h2>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[#111827] font-bold mb-4">Company</h3>
                    <ul className="space-y-2">
                      <li>
                        <a
                          className="text-[#6b7280] hover:text-[#111827] text-sm"
                          href="#"
                        >
                          About Us
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-[#6b7280] hover:text-[#111827] text-sm"
                          href="#"
                        >
                          Careers
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-[#6b7280] hover:text-[#111827] text-sm"
                          href="#"
                        >
                          Press
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[#111827] font-bold mb-4">Products</h3>
                    <ul className="space-y-2">
                      <li>
                        <a
                          className="text-[#6b7280] hover:text-[#111827] text-sm"
                          href="#"
                        >
                          Ride
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-[#6b7280] hover:text-[#111827] text-sm"
                          href="#"
                        >
                          Drive
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-[#6b7280] hover:text-[#111827] text-sm"
                          href="#"
                        >
                          Business
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[#111827] font-bold mb-4">Support</h3>
                    <ul className="space-y-2">
                      <li>
                        <a
                          className="text-[#6b7280] hover:text-[#111827] text-sm"
                          href="#"
                        >
                          Help Center
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-[#6b7280] hover:text-[#111827] text-sm"
                          href="#"
                        >
                          Contact Us
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-[#6b7280] hover:text-[#111827] text-sm"
                          href="#"
                        >
                          Safety
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-10 pt-6 border-t border-[#e5e7eb] text-center text-xs text-[#6b7280]">
                  <p>© 2024 RideShare Technologies Inc. All rights reserved.</p>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
