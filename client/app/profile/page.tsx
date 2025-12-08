"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import { fetchUserProfile } from "@/src/libs/profileApi";
import { getStoredUser, clearAuth } from "@/src/libs/auth";
import type { User } from "@/src/libs/types";

function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const currentUser = getStoredUser();
    if (!currentUser) {
      return;
    }

    const loadProfile = async () => {
      try {
        const profile = await fetchUserProfile(currentUser.username);
        setUser(profile);
        localStorage.setItem("rideshareUser", JSON.stringify(profile));
      } catch (error) {
        console.error(error);
        setError("Unable to load your profile at the moment.");
        setUser(currentUser);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const logout = () => {
    clearAuth();
    router.push("/auth");
  };

  return (
    <div className="bg-[#FFFFFF] font-['Plus_Jakarta_Sans','Noto_Sans',sans-serif] text-[#1A1A1A]">
      <div className="relative flex min-h-screen w-full flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E8E8E8] bg-white px-6 py-3 md:px-10">
          <div className="flex items-center gap-4 text-[#1A1A1A]">
            <div className="size-6">
              <svg
                fill="currentColor"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_6_543)">
                  <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"></path>
                  <path
                    clipRule="evenodd"
                    d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z"
                    fillRule="evenodd"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_6_543">
                    <rect fill="white" height="48" width="48"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
              RideShare
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="rounded-full bg-[#F6F6F6] px-4 py-2 text-sm font-medium text-[#1A1A1A] hover:bg-[#E8E8E8]"
              onClick={logout}
              type="button"
            >
              Log Out
            </button>
            <div
              className="size-10 rounded-full bg-cover bg-center"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAQwKOVs7rtaUmKj2JjYjngaXeyV75b58q9fN1qqp8HQ72thqk6OZCi6AC9PDOXjGGT_swoNXU-UNVMUgNh81GdSlOFdhr9E7mHmxpHfpWHybWcU9ngmMDbJRhu7it68Wh8JWd7OI5CHwN3xOaa74UvkqVb_ewm_IdJ4xKHLA7XGOVPz5QsnEhSR0DEqax0wYSpY-Wh7uyXRL4IurQcyhyRLIkH5raD4WKVsj4KRTiVzpmZz84xEwd7NA8Z-ap5untzrGQWTeSUTGI")',
              }}
            ></div>
          </div>
        </header>

        <main className="flex-1 bg-[#F6F6F6] p-6 md:p-10">
          <div className="mx-auto flex max-w-4xl flex-col gap-8">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <section className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="size-20 rounded-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuANGANMp_PI5ynTVwglueFezg7YjVX81ybKHowumDHMb5zzTmH4JiARnvsWa5-DxvxCXQcYT6ClYmvLoMsgPg6P9TzmHfbFGLkLt4adRbgcqlvLFIvc4lHaaNjUJLILDrBjwURrlpw2BRy_FHJEiQJ5BVhf6rhhqKm-6bbQKyrIdcYlbJ-l8ZU6R4N-srx0QPVE_BJI827juYD9mQpvL6oeVZ0KhOK87anEmwNkUNa3RRnNurlrHqlQptHOvgBq9Km4Np80uxufYgg")',
                    }}
                  ></div>
                  <div>
                    <p className="text-2xl font-bold text-[#1A1A1A]">
                      {loading ? "Loading profile..." : user?.name}
                    </p>
                    <p className="text-sm text-[#6B6B6B]">
                      Role: {user?.role ?? "--"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-[#1A1A1A]">
                Personal Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#6B6B6B]">Full Name</p>
                    <p className="text-base font-medium text-[#1A1A1A]">
                      {user?.name ?? "--"}
                    </p>
                  </div>
                </div>
                <hr className="border-[#E8E8E8]" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#6B6B6B]">Username</p>
                    <p className="text-base font-medium text-[#1A1A1A]">
                      {user?.username ?? "--"}
                    </p>
                  </div>
                </div>
                <hr className="border-[#E8E8E8]" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#6B6B6B]">Account ID</p>
                    <p className="text-base font-medium text-[#1A1A1A] wrap-break-word">
                      {user?.id ?? "--"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-[#1A1A1A]">
                Security
              </h3>
              <div className="space-y-3 text-sm text-[#6B6B6B]">
                <p>
                  Keep your credentials safe. Contact support to update
                  sensitive information.
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function ProfilePageWrapper() {
  return (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  );
}
