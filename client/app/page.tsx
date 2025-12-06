import React from "react";

export default function Page() {
  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          className="w-full h-full object-cover opacity-10"
          alt="Abstract gradient of blue and purple light trails against a dark city background"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjhRJocafCcjzmEipOWlqbb-CRYVWq5ZAXY00ezbtofwXuOaD6LKTzm3qEyUfy3EXiFGDuJX14CAIQxWbh3uYQXtWnumYPfTpjYORUvYY27Gnia7HaK3GMtmkQw5G7CkDSOt-rK1vnTHBeaNCbp4tdjgNQeTgnoiehfDSkneui1Hk7ohuOUa55YuAdpn1VGff_VLnpjHJWLG--CqUGj7hNXOoXbx5XRd4m_56kcPfM4N_etdIARLiBsHQAKHD1JEaG6gZpH6VUVS3m"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background-light/0 to-background-light"></div>
      </div>
      <div className="relative z-10 w-full">
        <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6 border-b border-border-light">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
                  <span className="material-symbols-outlined text-background-light text-xl">
                    directions_car
                  </span>
                </div>
                <h2 className="text-text-primary text-2xl font-bold tracking-tight">
                  RideShare
                </h2>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <a
                  className="text-text-primary hover:text-accent text-base font-medium transition-colors"
                  href="#"
                >
                  Passenger
                </a>
                <a
                  className="text-text-primary hover:text-accent text-base font-medium transition-colors"
                  href="#"
                >
                  Driver
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-9 px-5 bg-surface text-text-primary text-sm font-medium hover:bg-border-light transition-colors">
                <span className="truncate">Log In</span>
              </button>
              <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-9 px-5 bg-primary text-white text-sm font-medium hover:bg-text-secondary transition-colors">
                <span className="truncate">Sign Up</span>
              </button>
            </div>
          </div>
        </header>
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="py-24 sm:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">
                <h1 className="text-text-primary text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl">
                  Go anywhere with RideShare
                </h1>
                <p className="text-text-secondary text-lg font-normal leading-relaxed md:text-xl max-w-xl mt-1">
                  Request a ride, hop in, and go. The best way to get wherever
                  you're going.
                </p>
              </div>
              <div className="w-full max-w-md mx-auto lg:mx-0 bg-white p-8 rounded-xl shadow-lg border border-border-light">
                <h3 className="text-2xl font-bold text-text-primary mb-6">
                  Request a ride now
                </h3>
                <form className="space-y-4">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary">
                      my_location
                    </span>
                    <input
                      className="w-full h-12 pl-12 pr-4 bg-surface rounded-lg border-border-light focus:ring-accent focus:border-accent"
                      placeholder="Enter pickup location"
                      type="text"
                    />
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary">
                      location_on
                    </span>
                    <input
                      className="w-full h-12 pl-12 pr-4 bg-surface rounded-lg border-border-light focus:ring-accent focus:border-accent"
                      placeholder="Enter destination"
                      type="text"
                    />
                  </div>
                  <button
                    className="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-medium hover:bg-text-secondary transition-colors"
                    type="submit"
                  >
                    <span className="truncate">Request Now</span>
                  </button>
                </form>
              </div>
            </div>
          </section>
          <section className="py-16 sm:py-24">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-text-primary text-4xl font-bold tracking-tight sm:text-5xl">
                Why ride with us?
              </h2>
              <p className="mt-5 text-text-secondary text-lg">
                We're committed to your safety and providing a reliable service
                you can trust.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-4 text-center items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-surface">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    event_available
                  </span>
                </div>
                <h3 className="text-text-primary text-xl font-semibold">
                  Easy Booking
                </h3>
                <p className="text-text-secondary text-base font-normal leading-relaxed">
                  Tap and go. Get a ride in minutes, at any time and on any day
                  of the year.
                </p>
              </div>
              <div className="flex flex-col gap-4 text-center items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-surface">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    verified_user
                  </span>
                </div>
                <h3 className="text-text-primary text-xl font-semibold">
                  Reliable Drivers
                </h3>
                <p className="text-text-secondary text-base font-normal leading-relaxed">
                  All drivers are background-checked and committed to the
                  highest standards of safety.
                </p>
              </div>
              <div className="flex flex-col gap-4 text-center items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-surface">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    receipt_long
                  </span>
                </div>
                <h3 className="text-text-primary text-xl font-semibold">
                  Transparent Pricing
                </h3>
                <p className="text-text-secondary text-base font-normal leading-relaxed">
                  See the cost upfront before you book. No surprises, just fair
                  and transparent fares.
                </p>
              </div>
            </div>
          </section>
          <section className="py-16 sm:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
                What our riders say
              </h2>
              <div className="mt-12">
                <blockquote className="text-xl font-medium text-text-secondary">
                  "RideShare has completely changed my commute. It's so
                  convenient and the drivers are always professional and
                  friendly. I can't imagine going back to my old routine!"
                </blockquote>
                <div className="mt-8 flex items-center justify-center gap-4">
                  <img
                    alt="Profile picture of Alex Johnson"
                    className="h-12 w-12 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuxJdxGYuhG-rqPVwGNWgEeHc-uDTNGckVNRprPvWXHOJcVh-q5uCSCP6Me5e4BJDMYWv_fwlqaBHLFFuc-5OhfhWx2nfk03K97UfCvX-T3ih65TdTpuInbMcBK1ZgUAzN0BLdJ89WgtezqrUt5dl5whNKhlQQ0pNf-F-ine8r-xWWxrnixwo2Y0xqxprhJkR8L2wsCbkaO0nVMeT7ERbknFb5cf1wQ1HQXj3tOwcq6gHh6NW9Q6INq9wdwW8qNOSKkpOAqTbjzh8O"
                  />
                  <div>
                    <p className="text-base font-semibold text-text-primary">
                      Alex Johnson
                    </p>
                    <p className="text-sm text-text-tertiary">Frequent Rider</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="py-16 sm:py-24">
            <div className="text-center">
              <h2 className="text-text-primary text-2xl font-semibold tracking-tight">
                Trusted by leading companies
              </h2>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
                <img
                  alt="Transistor"
                  className="h-8"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUzc3Vt-fxQTOsEoOSuobakpbeVYwVrJLBg-ds2_STQFrwtfn05utmxk5UIyAN2we1m-SvhAwTGP7Moa-4iXa0wZXG_Ry9sI4bXEHsuQF6J0Wb5US7aiZmh9kdR72LKiVaX4Hmg5gBbrBi5d0dsOadcdvroyX6JdI2tsuIwLS4W9Mr5faFrqI8msb0l3wwPCNYXyrts63b2h588bfzfCNqG8EHvV975rGfSTCPd0Z9x8UM4DyHasjsSokoc34ssHlUM6OlL5p0sRWm"
                />
                <img
                  alt="Reform"
                  className="h-8"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDytQgqNGhAhiBE_dUU-L-7w5EQJWqJBaQJy8YlUzfbUGTee99YodMff037hTawJicB4tZotoLWmjUvXiKOMKaiUifp9aftJrJDS6FeLjfNJmqCKK4YNmaqfnn5JPERegHm5lda79n9MWiP500rHoxarFsWGypu4jyWPmPj-RohlVM68AZauyUWicxoZ6Awr6J4yD-d50dP3GDubZZwkL4RzfI-xHYQZpdtWdjMWEDQqTcbFOuRayvvMw6JYgih4kMpImDsniJVvaG9"
                />
                <img
                  alt="Tuple"
                  className="h-8"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQ4jnT8IwpDYROSjkbXM9rsX8xXHH5PpJ5cN8q7H35B8Mg3ovnzi36bZ4W02X2YLwJif7P6YFZBhVBxc7PycHAOGNxzVPgwlW2IvSCXapC7jgXP8jMB7VD7ZfFsODu5pe-8gHHFI14iKT_0tuiv6ui0IupR1QJb1S1LN2X6DXmgIK4akKVQhj9TaJgRFowmGJG_IrH7WVcHFlPHhBqkb-T3KJqGo_gOyQagMdA6--IyozbFhhE382gMUZ62Mgu0xHLgO6A1GzX7Sl8"
                />
                <img
                  alt="SavvyCal"
                  className="h-8"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuChTrpRgjbC3ieETj7yh6ce7HZJ0Y-awrwQSueIejfl6rKxbnOi1zCzNxXGZPbnsE_d3eJCoVwYq5k5WpbDqy1576dr9GuBsf7OUXVSOmgo6FeueUC-y6Ydaum5-YiBW7DkykmV4lLu2yFxN_RsQRJcs8Cm4ql7YlEuMjZ_Eu0nVSGO24en55z3m6mZk3rZNYpZ4O1YdKEJoeOadanXzHNVmlrIHoXB_RdvkT3cSrL2jVj-DpSrqHPhnwthvczth2Sj6o9-MjX8EBWY"
                />
                <img
                  alt="Statamic"
                  className="h-8"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCokI5nj6WsEHZC-db1THGxQTx81jtflkLw14k4im6HqqKVzWaBDgkjHI3Ko868D2Y1n1XJuqb0UXGwqB16b89W8-vpbIRXShArrDm8pafAy4d6_hZ2JZ_PNh65cUvfb7PvoixRf3hxy9nQzZHClWAy6F_BzgHgvMQylyA07mZLbBHVMrx9gnOWfTQ0K27BdQ5qiyvqQLnllUQNm06mEFXxBi8rRTP7QwB6KDfcZbkJtOfF6sz5DghcsECKENZ5Wxj_Kk3ypVpbOggd"
                />
              </div>
            </div>
          </section>
        </main>
        <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 border-t border-border-light">
          <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-8 py-10">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
                <span className="material-symbols-outlined text-background-light text-xl">
                  directions_car
                </span>
              </div>
              <h2 className="text-text-primary text-xl font-bold tracking-tight">
                RideShare
              </h2>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <a
                className="text-text-secondary hover:text-text-primary text-sm transition-colors"
                href="#"
              >
                Contact Us
              </a>
              <a
                className="text-text-secondary hover:text-text-primary text-sm transition-colors"
                href="#"
              >
                Terms of Service
              </a>
              <a
                className="text-text-secondary hover:text-text-primary text-sm transition-colors"
                href="#"
              >
                Privacy Policy
              </a>
            </div>
            <p className="text-text-tertiary text-sm">
              © 2024 RideShare Inc. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
