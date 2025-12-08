import React from "react";

export default function ProfilePage() {
  return (
    <div className="bg-[#FFFFFF] font-['Plus_Jakarta_Sans',_'Noto_Sans',_sans-serif] text-[#1A1A1A]">
      <div className="relative flex h-auto min-h-screen w-full flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#E8E8E8] px-6 md:px-10 py-3 bg-[#FFFFFF] sticky top-0 z-10">
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
          <div className="flex flex-1 justify-end gap-8 items-center">
            <div className="hidden md:flex items-center gap-9">
              <a
                className="text-sm font-medium leading-normal text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
                href="#"
              >
                Rides
              </a>
              <a
                className="text-sm font-medium leading-normal text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
                href="#"
              >
                Drive
              </a>
              <a
                className="text-sm font-medium leading-normal text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
                href="#"
              >
                Business
              </a>
              <a
                className="text-sm font-medium leading-normal text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
                href="#"
              >
                Safety
              </a>
            </div>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#F6F6F6] text-[#1A1A1A] text-sm font-medium leading-normal hover:bg-[#E8E8E8] transition-colors">
              <span className="truncate">Log Out</span>
            </button>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              data-alt="User profile picture"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAQwKOVs7rtaUmKj2JjYjngaXeyV75b58q9fN1qqp8HQ72thqk6OZCi6AC9PDOXjGGT_swoNXU-UNVMUgNh81GdSlOFdhr9E7mHmxpHfpWHybWcU9ngmMDbJRhu7it68Wh8JWd7OI5CHwN3xOaa74UvkqVb_ewm_IdJ4xKHLA7XGOVPz5QsnEhSR0DEqax0wYSpY-Wh7uyXRL4IurQcyhyRLIkH5raD4WKVsj4KRTiVzpmZz84xEwd7NA8Z-ap5untzrGQWTeSUTGI")',
              }}
            ></div>
          </div>
        </header>

        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0 p-6 border-r border-[#E8E8E8] hidden md:block bg-[#FFFFFF]">
            <nav className="flex h-full flex-col justify-between">
              <div className="flex flex-col gap-2">
                <a
                  className="flex items-center gap-4 px-4 py-2.5 rounded-full bg-[#F6F6F6]"
                  href="#"
                >
                  <span className="material-symbols-outlined text-[#1A1A1A] text-2xl">
                    person
                  </span>
                  <p className="text-[#1A1A1A] text-sm font-medium leading-normal">
                    My Profile
                  </p>
                </a>
                <a
                  className="flex items-center gap-4 px-4 py-2.5 rounded-full hover:bg-[#F6F6F6] cursor-pointer transition-colors"
                  href="#"
                >
                  <span className="material-symbols-outlined text-[#6B6B6B] text-2xl">
                    payment
                  </span>
                  <p className="text-[#6B6B6B] text-sm font-medium leading-normal">
                    Payment
                  </p>
                </a>
                <a
                  className="flex items-center gap-4 px-4 py-2.5 rounded-full hover:bg-[#F6F6F6] cursor-pointer transition-colors"
                  href="#"
                >
                  <span className="material-symbols-outlined text-[#6B6B6B] text-2xl">
                    privacy_tip
                  </span>
                  <p className="text-[#6B6B6B] text-sm font-medium leading-normal">
                    Privacy
                  </p>
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <a
                  className="flex items-center gap-4 px-4 py-2.5 rounded-full hover:bg-[#F6F6F6] cursor-pointer transition-colors"
                  href="#"
                >
                  <span className="material-symbols-outlined text-[#6B6B6B] text-2xl">
                    help_center
                  </span>
                  <p className="text-[#6B6B6B] text-sm font-medium leading-normal">
                    Help Center
                  </p>
                </a>
                <a
                  className="flex items-center gap-4 px-4 py-2.5 rounded-full hover:bg-[#F6F6F6] cursor-pointer transition-colors"
                  href="#"
                >
                  <span className="material-symbols-outlined text-[#6B6B6B] text-2xl">
                    logout
                  </span>
                  <p className="text-[#6B6B6B] text-sm font-medium leading-normal">
                    Log Out
                  </p>
                </a>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 md:p-10 bg-[#F6F6F6]">
            <div className="max-w-4xl mx-auto space-y-10">
              <div className="flex p-4 @container">
                <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
                  <div className="flex gap-4 items-center">
                    <div className="relative">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-24 w-24 md:min-h-32 md:w-32"
                        data-alt="User profile picture"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuANGANMp_PI5ynTVwglueFezg7YjVX81ybKHowumDHMb5zzTmH4JiARnvsWa5-DxvxCXQcYT6ClYmvLoMsgPg6P9TzmHfbFGLkLt4adRbgcqlvLFIvc4lHaaNjUJLILDrBjwURrlpw2BRy_FHJEiQJ5BVhf6rhhqKm-6bbQKyrIdcYlbJ-l8ZU6R4N-srx0QPVE_BJI827juYD9mQpvL6oeVZ0KhOK87anEmwNkUNa3RRnNurlrHqlQptHOvgBq9Km4Np80uxufYgg")',
                        }}
                      ></div>
                      <button className="absolute bottom-1 right-1 bg-[#1A1A1A] text-white rounded-full p-2 hover:bg-opacity-80 transition-colors">
                        <span className="material-symbols-outlined text-base">
                          edit
                        </span>
                      </button>
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                      <p className="text-[#1A1A1A] text-2xl font-bold leading-tight tracking-[-0.015em]">
                        Alex Johnson
                      </p>
                      <p className="text-[#6B6B6B] text-base font-normal leading-normal">
                        Member since Jan 2023
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8E8E8] px-2 py-1 text-xs font-medium text-[#6B6B6B]">
                          <span className="material-symbols-outlined text-sm">
                            directions_car
                          </span>
                          Driver
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8E8E8] px-2 py-1 text-xs font-medium text-[#6B6B6B]">
                          <span className="material-symbols-outlined text-sm">
                            person
                          </span>
                          Passenger
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <section id="personal-info">
                <h2 className="text-[#1A1A1A] text-xl font-bold leading-tight tracking-[-0.015em] px-4 pb-4">
                  Personal Information
                </h2>
                <div className="bg-[#FFFFFF] rounded-xl">
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[#6B6B6B] text-sm">Full Name</p>
                        <p className="text-[#1A1A1A] text-base font-medium">
                          Alex Johnson
                        </p>
                      </div>
                      <button className="text-sm font-medium text-[#1A1A1A] hover:underline cursor-pointer">
                        Edit
                      </button>
                    </div>
                    <hr className="border-[#E8E8E8]" />
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[#6B6B6B] text-sm">Email Address</p>
                        <p className="text-[#1A1A1A] text-base font-medium">
                          alex.j@example.com
                        </p>
                      </div>
                      <button className="text-sm font-medium text-[#1A1A1A] hover:underline cursor-pointer">
                        Edit
                      </button>
                    </div>
                    <hr className="border-[#E8E8E8]" />
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[#6B6B6B] text-sm">Phone Number</p>
                        <p className="text-[#1A1A1A] text-base font-medium">
                          +1 234 567 8900
                        </p>
                      </div>
                      <button className="text-sm font-medium text-[#1A1A1A] hover:underline cursor-pointer">
                        Edit
                      </button>
                    </div>
                    <hr className="border-[#E8E8E8]" />
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[#6B6B6B] text-sm">Password</p>
                        <p className="text-[#1A1A1A] text-base font-medium">
                          ************
                        </p>
                      </div>
                      <button className="text-sm font-medium text-[#1A1A1A] hover:underline cursor-pointer">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section id="payment-methods">
                <h2 className="text-[#1A1A1A] text-xl font-bold leading-tight tracking-[-0.015em] px-4 pb-4">
                  Payment Methods
                </h2>
                <div className="bg-[#FFFFFF] rounded-xl p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <img
                        alt="Visa card icon"
                        className="w-10 h-auto"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbXDYPTIE0eNEw3lPh4l_xoR17mp35s36Uw06eQT74qxPAmspPRnsnEFZ-bJtAT1DdJzIFUPSGqV1rxJucHU2j08qsncs8cydtgmc5-uMZGCdCHHKu-PHk1jRo5MXvhpFM3BIb4RraXodiiafgZ8VD98l3h_5bV7HUBPwAlsNnBpCfKE2GPm1Rl1TpsXukQ-gk0rHtgUml_mh8kfvQTFscSapLDK1igxJUoOZHUuU7hBCuxCD1icRdtX8qC8uuUQxFhpD5y0CIS7g"
                      />
                      <div>
                        <p className="font-medium text-[#1A1A1A]">
                          Visa ending in 1234
                        </p>
                        <p className="text-sm text-[#6B6B6B]">Default</p>
                      </div>
                    </div>
                    <button className="text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors cursor-pointer">
                      <span className="material-symbols-outlined">
                        more_horiz
                      </span>
                    </button>
                  </div>
                  <hr className="border-[#E8E8E8]" />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <img
                        alt="Mastercard icon"
                        className="w-10 h-auto"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBufOVGo0WhrKxKpoC1Sqy1vs-Vurmg6nDZyXEGfeEtxrOP-iYbP3_XqcBG_X6ImD5jq3Fyo7fhKQ7_FApxXcqjBVReomN1LBga-uBdnyNPMBLExcvRt3kWcoDm4axiLw0-ZzSBuxYoBijrjG8feXV3N0cNopKnaQXIru9IuGUED4wP3HYUaxvkyi6K7zC0KjGRrtBKSPPhic5g6evjv1yrXVSqTRJlb4LZSXzAYyAaMwjwUZwu3vc2mcJIhK5vDrWocFY2Prc1GtY"
                      />
                      <div>
                        <p className="font-medium text-[#1A1A1A]">
                          Mastercard ending in 5678
                        </p>
                        <p className="text-sm text-[#6B6B6B]">Expires 12/25</p>
                      </div>
                    </div>
                    <button className="text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors cursor-pointer">
                      <span className="material-symbols-outlined">
                        more_horiz
                      </span>
                    </button>
                  </div>
                  <hr className="border-[#E8E8E8]" />
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg h-12 bg-[#F6F6F6] text-[#1A1A1A] text-sm font-medium hover:bg-[#E8E8E8] transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-lg">
                      add
                    </span>
                    <span className="truncate">Add Payment Method</span>
                  </button>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
