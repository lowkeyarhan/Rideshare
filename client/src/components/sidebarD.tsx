import React from "react";

const SidebarD = () => (
  <aside className="flex w-64 flex-col border-r border-[#E5E5E5] bg-[#FFFFFF] p-4">
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          data-alt="John Doe's profile picture"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDaKGYQiKrLkyCRTedrGiaA_yFXr1YCkbKpU1ivRFVITBR2S6yDadxEyCh20pEgj3j6khcbEFW2iTSLMh1iKHJlfbOfBk7Jrw2XSVKBjel4-7P32HmUiNDU6EejAKtxwMQBdp2YyWt-HmwiJXkw939uNIEvW4TNHEGnvcr8grx42UAOK4p9rkA_tzB2r50fIESkixNRy-sxt4EiF0tTtxbi1L6-louJPZN8DtTmZL6Mbgi3Gosgob3Y_8bivLzxcmz79GrTTCZ8jKk")',
          }}
        />
        <div className="flex flex-col">
          <h1 className="text-[#1A1A1A] text-base font-bold leading-normal">
            John Doe
          </h1>
          <p className="text-[#5C5C5C] text-sm font-normal leading-normal">
            RideShare Driver
          </p>
        </div>
      </div>
      <nav className="flex flex-col gap-2 mt-4">
        <a
          className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#F7F7F7]"
          href="#"
        >
          <span
            className="material-symbols-outlined text-[#1A1A1A]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            dashboard
          </span>
          <p className="text-[#1A1A1A] text-sm font-semibold leading-normal">
            Dashboard
          </p>
        </a>
        <a
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F7F7F7]"
          href="#"
        >
          <span className="material-symbols-outlined text-[#5C5C5C]">
            payments
          </span>
          <p className="text-[#1A1A1A] text-sm font-medium leading-normal">
            Earnings
          </p>
        </a>
        <a
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F7F7F7]"
          href="#"
        >
          <span className="material-symbols-outlined text-[#5C5C5C]">
            history
          </span>
          <p className="text-[#1A1A1A] text-sm font-medium leading-normal">
            Ride History
          </p>
        </a>
        <a
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F7F7F7]"
          href="#"
        >
          <span className="material-symbols-outlined text-[#5C5C5C]">
            account_circle
          </span>
          <p className="text-[#1A1A1A] text-sm font-medium leading-normal">
            Profile
          </p>
        </a>
        <a
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F7F7F7]"
          href="#"
        >
          <span className="material-symbols-outlined text-[#5C5C5C]">
            support_agent
          </span>
          <p className="text-[#1A1A1A] text-sm font-medium leading-normal">
            Support
          </p>
        </a>
      </nav>
    </div>
    <div className="mt-auto">
      <div className="flex items-center justify-between gap-4 py-2">
        <p className="text-[#1A1A1A] text-lg font-bold">You are online</p>
        <label className="relative h-[28px] w-[48px] cursor-pointer">
          <input defaultChecked className="peer sr-only" type="checkbox" />
          <div className="h-full w-full rounded-full bg-[#22C55E] transition-colors"></div>
          <div className="absolute left-1 top-1 h-[20px] w-[20px] rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-full"></div>
        </label>
      </div>
    </div>
  </aside>
);

export default SidebarD;
