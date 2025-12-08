import React from "react";

type SidebarProps = {
  name?: string;
  subtitle?: string;
  onLogout?: () => void;
};

const SidebarP = ({
  name = "Passenger",
  subtitle = "Welcome back",
  onLogout,
}: SidebarProps) => (
  <aside className="flex w-64 flex-col border-r border-[#E5E5E5] bg-[#FFFFFF] p-4">
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 p-2">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 h-10"
          data-alt="Yatri Passenger profile picture"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDMAcAnH5mPU2Gv5LJctGJKRrZquFNt5SpS4zi3RCSFAjs3YSCvWDw1V0kXShFZLK9CbynSmO_zA_iywUJFywzUkrcK_3qzW1bmtSi6IQScwmvGQFaSk0I1HOm_olOdM2XQqnt7hCldUynHeza_0IPCiI-_w1NqCdXHSBDwZXQTc3x5KcOSJuFa_MOsS1GlyN5nUAgWD3RIinXwSzVI6KOZpw9P1bYVZU2w4wyweaiqsVmKMZNU_wNjJwTTCwprSD-Ko234FyiUzJY")',
          }}
        />
        <div>
          <h1 className="text-[#141414] text-base font-semibold leading-normal">
            {name}
          </h1>
          <p className="text-[#707070] text-sm font-normal leading-normal">
            {subtitle}
          </p>
        </div>
      </div>
      <nav className="flex flex-col gap-2 mt-4">
        <a
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white bg-[#141414]"
          href="#"
        >
          <span className="material-symbols-outlined">dashboard</span>
          Dashboard
        </a>
        <a
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#707070] hover:bg-black/5"
          href="#"
        >
          <span className="material-symbols-outlined">history</span>
          Ride History
        </a>
        <a
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#707070] hover:bg-black/5"
          href="#"
        >
          <span className="material-symbols-outlined">payment</span>
          Payments
        </a>
        <a
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#707070] hover:bg-black/5"
          href="#"
        >
          <span className="material-symbols-outlined">person</span>
          Profile
        </a>
        <a
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#707070] hover:bg-black/5"
          href="#"
        >
          <span className="material-symbols-outlined">support</span>
          Support
        </a>
      </nav>
    </div>
    <div className="mt-auto">
      <button
        className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#707070] hover:bg-black/5"
        onClick={onLogout}
        type="button"
      >
        <span className="material-symbols-outlined">logout</span>
        Log Out
      </button>
    </div>
  </aside>
);

export default SidebarP;
