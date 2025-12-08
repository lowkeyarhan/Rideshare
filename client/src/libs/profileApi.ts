import { User } from "./types";

export const fetchUserProfile = (): Promise<User | null> =>
  Promise.resolve(
    typeof window !== "undefined" && localStorage.getItem("rideshareUser")
      ? JSON.parse(localStorage.getItem("rideshareUser")!)
      : null
  );
