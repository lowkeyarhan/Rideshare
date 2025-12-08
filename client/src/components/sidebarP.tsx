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
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          data-alt="Yatri Passenger profile picture"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDMAcAnH5mPU2Gv5LJctGJKRrZquFNt5SpS4zi3RCSFAjs3YSCvWDw1V0kXShFZLK9CbynSmO_zA_iywUJFywzUkrcK_3qzW1bmtSi6IQScwmvGQFaSk0I1HOm_olOdM2XQqnt7hCldUynHeza_0IPCiI-_w1NqCdXHSBDwZXQTc3x5KcOSJuFa_MOsS1GlyN5nUAgWD3RIinXwSzVI6KOZpw9P1bYVZU2w4wyweaiqsVmKMZNU_wNjJwTTCwprSD-Ko234FyiUzJY")',
          }}
        />
        <div className="flex flex-col">
          <h1 className="text-[#141414] text-base font-medium leading-normal">
            {name}
          </h1>
          <p className="text-[#707070] text-sm font-normal leading-normal">
            {subtitle}
          </p>
        </div>
      </div>
      <nav className="flex flex-col gap-2 mt-4">
        <a
          className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#141414] text-white"
          href="#"
        >
          <span className="material-symbols-outlined">dashboard</span>
          <p className="text-sm font-medium leading-normal">Dashboard</p>
        </a>
        <a
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-black/5 text-[#707070]"
          href="#"
        >
          <span className="material-symbols-outlined">history</span>
          <p className="text-sm font-medium leading-normal">Ride History</p>
        </a>
        <a
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-black/5 text-[#707070]"
          href="#"
        >
          <span className="material-symbols-outlined">payment</span>
          <p className="text-sm font-medium leading-normal">Payments</p>
        </a>
        <a
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-black/5 text-[#707070]"
          href="#"
        >
          <span className="material-symbols-outlined">person</span>
          <p className="text-sm font-medium leading-normal">Profile</p>
        </a>
        <a
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-black/5 text-[#707070]"
          href="#"
        >
          <span className="material-symbols-outlined">help_outline</span>
          <p className="text-sm font-medium leading-normal">Support</p>
        </a>
      </nav>
    </div>
    <div className="mt-auto">
      <button
        className="flex w-full items-center justify-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#707070] hover:bg-black/5 cursor-pointer"
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
