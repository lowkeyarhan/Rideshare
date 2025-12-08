import React from "react";
import SidebarP from "@/src/components/sidebarP";

export default function Dashboard() {
  return (
    <div className="bg-background text-primary font-display">
      <div className="flex h-screen w-full">
        <SidebarP />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#F7F7F7]">
          <div className="mx-auto max-w-7xl">
            <header className="mb-8">
              <div className="flex flex-col gap-2 mb-6">
                <h1 className="text-[#141414] text-4xl font-black leading-tight tracking-[-0.033em]">
                  Hello, Alex!
                </h1>
                <p className="text-[#707070] text-base font-normal leading-normal">
                  Ready to book your next ride?
                </p>
              </div>
              <div className="bg-[#FFFFFF] p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 flex flex-col items-center mr-2">
                    <div className="size-2.5 rounded-full bg-[#141414]"></div>
                    <div className="w-px h-8 bg-[#E5E5E5] my-2"></div>
                    <div
                      className="size-2.5 bg-[#141414]"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                      }}
                    ></div>
                  </div>
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="relative w-full">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#707070]">
                        my_location
                      </span>
                      <input
                        className="w-full pl-10 pr-4 py-3 bg-[#F7F7F7] rounded-lg text-[#141414] placeholder-[#707070] border-transparent focus:ring-2 focus:ring-[#141414] focus:border-transparent focus:outline-none"
                        placeholder="Enter pickup location"
                        type="text"
                        defaultValue="Current Location"
                      />
                    </div>
                    <div className="relative w-full">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#707070]">
                        location_on
                      </span>
                      <input
                        className="w-full pl-10 pr-4 py-3 bg-[#F7F7F7] rounded-lg text-[#141414] placeholder-[#707070] border-transparent focus:ring-2 focus:ring-[#141414] focus:border-transparent focus:outline-none"
                        placeholder="Where to?"
                        type="text"
                      />
                    </div>
                  </div>
                  <button className="flex ml-4 min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-[92px] px-6 bg-[#141414] text-white text-base font-medium leading-normal hover:bg-opacity-90 transition-colors">
                    <span className="truncate">Find Ride</span>
                  </button>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Ride Status */}
              <div className="lg:col-span-2 flex flex-col gap-8">
                <div className="bg-[#FFFFFF] p-6 rounded-xl">
                  <p className="text-[#141414] text-lg font-bold leading-tight tracking-[-0.015em] mb-4">
                    Current Ride Status
                  </p>
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg object-cover mb-4"
                    data-alt="A map showing the live location of a ride in progress with a route highlighted."
                    data-location="New York City"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBgyrtdDjhzt2QNDKd7T-k0abx8vmRBzeiPS2LDqXp9KvJ4fT_qngnLSaCaQHOQxTyIbtZJRBib_4gR7tCNue_ThkJ6unkMYmtOcVnqj6SEwugn6ftE5yfILKqm1recamQMPr0xBDZ9BKjs8mMH3SxAZ4wbpnWxqVnRF-qGlqHNcdNUv8U7TPXOY0qaB44eXrqNoM2Jtv3FF6rWo-nKc_7hM8lTU_NmENm0KL7dQoSb3fQ6SCRHh757P0_6-x4b2HgIrwm2l8ryAqA")',
                    }}
                  />
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAfZ6TTVbQtScwSYdYt0SKZM65kNZzelGd6wjR6oCchtbQqYJPFLWLsVN9jkwIvxCt2fsWEB3XvubFdJxlGo9Llwf80Z7gNrrfRppaVRp_f3MT_cIUcJb7koA-zqtIGqfAjmQOXKoCtUfnVmhlvAPyAbX4K6Y9CQm_D8fny6QzjwNKoMPHBftI7vo0qW9u0VpqPhXeipA7seWUVX8BiDEE0k77Ol3134i0ZqL26H9Zmww7EkLCPNOKjSlhHG-Gs1Tt__K_ycODUFW0")',
                        }}
                      />
                      <div>
                        <p className="font-semibold text-[#141414]">James R.</p>
                        <p className="text-sm text-[#707070]">
                          Toyota Camry - ABC-123
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[#707070]">
                        Estimated Arrival
                      </p>
                      <p className="font-bold text-2xl text-[#141414]">5 min</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: History & Payments */}
              <div className="lg:col-span-1 flex flex-col gap-8">
                {/* Ride History */}
                <div className="bg-[#FFFFFF] p-6 rounded-xl">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-[#141414] text-lg font-bold leading-tight tracking-[-0.015em]">
                      Ride History
                    </p>
                    <a
                      className="text-sm font-medium text-[#141414] hover:underline"
                      href="#"
                    >
                      View All
                    </a>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center size-10 rounded-lg bg-[#F7F7F7]">
                        <span className="material-symbols-outlined text-[#141414]">
                          directions_car
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#141414]">
                          Downtown to Airport
                        </p>
                        <p className="text-xs text-[#707070]">Oct 28, 2023</p>
                      </div>
                      <p className="text-sm font-semibold text-[#141414]">
                        $24.50
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center size-10 rounded-lg bg-[#F7F7F7]">
                        <span className="material-symbols-outlined text-[#141414]">
                          directions_car
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#141414]">
                          Midtown to Central Park
                        </p>
                        <p className="text-xs text-[#707070]">Oct 26, 2023</p>
                      </div>
                      <p className="text-sm font-semibold text-[#141414]">
                        $12.80
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center size-10 rounded-lg bg-[#F7F7F7]">
                        <span className="material-symbols-outlined text-[#141414]">
                          directions_car
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#141414]">
                          Home to Office
                        </p>
                        <p className="text-xs text-[#707070]">Oct 25, 2023</p>
                      </div>
                      <p className="text-sm font-semibold text-[#141414]">
                        $18.00
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payments */}
                <div className="bg-[#FFFFFF] p-6 rounded-xl">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-[#141414] text-lg font-bold leading-tight tracking-[-0.015em]">
                      Payment
                    </p>
                    <a
                      className="text-sm font-medium text-[#141414] hover:underline"
                      href="#"
                    >
                      Add New
                    </a>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-[#F7F7F7]">
                      <div className="flex items-center gap-3">
                        <img
                          alt="Visa logo"
                          className="h-4"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2E52u6SGq-Dsm_14LIEpmKTpKPGA9SpO7UtDRvvrwYoSmR_5XTxyDRUx9cC1Evoh-OJ2fR7IaBxBmPqmQ8ZKezb6WerjCG5FmtRS_WGzsIxc1y5MohUvykbquK5qkl_3cbyezJnMNgF_JZVqwtbdBP6HgLq3TzKUbkF72K1qr94k6qTsHyQKx8RuSM68VG71nln4-TiPLTeaylz66cp_1jTQd57nzMoR2M08xBywjXYgKmBXlqm5bYuEGc_15b7tFeLC5-MvtRcQ"
                        />
                        <p className="text-sm font-medium text-[#141414]">
                          **** 4242
                        </p>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-[#141414]/10 text-[#141414]">
                        Primary
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-[#F7F7F7]">
                      <div className="flex items-center gap-3">
                        <img
                          alt="Mastercard logo"
                          className="h-5"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNFC9IWggAvikoI3nLN1zY0tUOA0IT_M3fNRQIAB4kFWpZGG82rLuZGxSWJ5A-4-TymuSfG2eRQ7S28iGqu1zMn_cyps-kNxFWNML_BJ8q6E8SKG1-N7qvHxH1JLra498gqALBGdy-YUsMeKC1BHvQrxtbTuoQLamZSl0F8hzmLIEG-BTkf_mfrxmYeoCJcp3kF0RkGrXvAqhAipX1O2Kdqi-z_wzKO_RL2JQPDLKR7T-weiMoj1LVrNcufCxJz51T694CBLt9FKU"
                        />
                        <p className="text-sm font-medium text-[#141414]">
                          **** 5512
                        </p>
                      </div>
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
