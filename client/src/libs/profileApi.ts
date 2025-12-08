import apiClient from "./apiClient";
import { User } from "./types";

export const fetchUserProfile = async (username: string) => {
	const { data } = await apiClient.get<User>(`/api/users/${username}`);
	return data;
};
