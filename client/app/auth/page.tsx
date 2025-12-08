"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Auth() {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="font-display bg-[#FFFFFF] text-[#1A1A1A]">
      <div className="relative flex min-h-screen w-full">
        {/* Left Column - Form */}
        <div className="flex w-full flex-col items-center justify-center p-4 md:w-1/2 md:p-12 lg:p-16">
          <div className="w-full max-w-sm">
            <h1 className="text-[#1A1A1A] text-4xl font-bold tracking-tighter mb-2">
              RideShare
            </h1>
            <p className="text-[#6B6B6B] text-base mb-8">
              Welcome back. Please enter your details.
            </p>

            {/* Framer Motion Toggle */}
            <div className="mb-8">
              <div className="flex h-12 flex-1 items-center justify-center rounded-lg bg-[#F6F6F6] p-1 relative">
                {(["signin", "signup"] as const).map((mode) => {
                  const isSelected = authMode === mode;
                  return (
                    <button
                      key={mode}
                      onClick={() => setAuthMode(mode)}
                      className={`flex h-full flex-1 cursor-pointer items-center justify-center rounded-[0.375rem] px-2 text-sm font-medium leading-normal transition-colors duration-200 z-10 focus:outline-none ${
                        isSelected ? "text-[#1A1A1A]" : "text-[#6B6B6B]"
                      }`}
                      type="button"
                    >
                      {mode === "signin" ? "Sign In" : "Sign Up"}
                      {isSelected && (
                        <motion.div
                          layoutId="auth-toggle-pill"
                          className="absolute inset-1 w-[calc(50%-4px)] bg-[#FFFFFF] rounded-[0.375rem] shadow-sm -z-10"
                          style={{
                            left: mode === "signin" ? "4px" : "50%",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col">
                <label
                  className="text-sm font-medium text-[#1A1A1A] mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="h-14 w-full rounded-lg border border-[#E5E5E5] bg-[#F6F6F6] px-4 py-3.5 text-base text-[#1A1A1A] placeholder:text-[#9E9E9E] focus:border-[#000000] focus:outline-none focus:ring-2 focus:ring-[#000000]/20"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  className="text-sm font-medium text-[#1A1A1A] mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative flex w-full items-center">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-14 w-full rounded-lg border border-[#E5E5E5] bg-[#F6F6F6] pl-4 pr-12 py-3.5 text-base text-[#1A1A1A] placeholder:text-[#9E9E9E] focus:border-[#000000] focus:outline-none focus:ring-2 focus:ring-[#000000]/20"
                  />
                  <button
                    className="absolute right-4 text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-2xl select-none">
                      {showPassword ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>
                {/* {authMode === "signin" && (
                    <a
                      className="mt-2 self-end text-sm text-[#6B6B6B] hover:text-[#000000]"
                      href="#"
                    >
                      Forgot Password?
                    </a>
                  )} */}
              </div>

              <div className="pt-4">
                <button
                  className="flex h-14 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#000000] text-base font-bold text-white transition-colors hover:bg-opacity-90"
                  type="submit"
                >
                  <span className="truncate">
                    {authMode === "signin" ? "Sign In" : "Create Account"}
                  </span>
                </button>
              </div>
            </form>

            <div className="my-8 flex items-center">
              <hr className="flex-grow border-t border-[#E5E5E5]" />
              <span className="px-4 text-sm text-[#6B6B6B]">
                Or continue with
              </span>
              <hr className="flex-grow border-t border-[#E5E5E5]" />
            </div>

            <div className="flex items-center justify-center gap-4">
              <button className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E5E5] bg-[#FFFFFF] hover:bg-[#F6F6F6] transition-colors cursor-pointer">
                <svg
                  height="24"
                  viewBox="0 0 48 48"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                    fill="#fbc02d"
                  />
                  <path
                    d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
                    fill="#e53935"
                  />
                  <path
                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                    fill="#4caf50"
                  />
                  <path
                    d="M43.611 20.083L43.595 20H42v-0.001H24v8h11.303c-0.792 2.237-2.231 4.166-4.087 5.574l6.19 5.238C42.012 35.421 44 30.038 44 24c0-1.341-.138-2.65-.389-3.917z"
                    fill="#1565c0"
                  />
                </svg>
              </button>
              <button className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E5E5] bg-[#FFFFFF] hover:bg-[#F6F6F6] transition-colors cursor-pointer">
                <svg
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.01 2c-5.524 0-10.01 4.486-10.01 10.01 0 4.965 3.61 9.103 8.304 9.85.606.112.827-.263.827-.584 0-.287-.01-1.235-.017-2.22-3.504.76-4.244-1.687-4.244-1.687-.55-1.397-1.344-1.77-1.344-1.77-1.097-.75.083-.734.083-.734 1.213.085 1.85 1.243 1.85 1.243 1.08 1.84 2.83 1.31 3.518 1.002.11-.78.423-1.31.77-1.61-2.682-.304-5.498-1.34-5.498-5.96 0-1.317.47-2.395 1.24-3.24-.124-.305-.538-1.532.117-3.195 0 0 1.013-.324 3.32 1.234.962-.267 1.995-.402 3.023-.406 1.028.004 2.06.14 3.023.406 2.306-1.558 3.316-1.234 3.316-1.234.655 1.663.242 2.89.118 3.195.77.845 1.238 1.923 1.238 3.24 0 4.63-2.82 5.65-5.51 5.95.434.375.822 1.11.822 2.236 0 1.613-.015 2.915-.015 3.31 0 .324.22.702.832.58C18.41 21.104 22.01 16.966 22.01 12.01 22.01 6.486 17.534 2 12.01 2Z"
                    fill="#1A1A1A"
                  />
                </svg>
              </button>
            </div>

            <p className="mt-12 text-center text-xs text-[#6B6B6B]">
              By signing in, you agree to RideShare's{" "}
              <a className="underline hover:text-[#000000]" href="#">
                Terms of Service
              </a>{" "}
              and{" "}
              <a className="underline hover:text-[#000000]" href="#">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            alt="Abstract gradient background representing motion and elegance"
            className="h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHPJJYQ2DIB8yIFX533SEvyEZUuOLAcle0r58HA386bF9nPfNlTyyNkPVOGRPk01UOo3zsYGheZ8fJsOQO3UtKw07uASqVhR_9FxkDFYSkIFiZ3CmYLLYymPVARQ4Yuc-h01yl4gm9q-dLc3jwbyKIKDPHN1TKMLri6f5m2qAh7JXvDQFhZHFkSqDhZPwAy0iDFAYLEfVukZlrUe9ba3ePX8ivGlNkPfQm0Pz39jk7K3zPZHW8QieOtuw7eD4shKosn2O7feFVF3A"
          />
        </div>
      </div>
    </div>
  );
}
