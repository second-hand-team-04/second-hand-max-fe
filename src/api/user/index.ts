import { fetcherProtected } from "../fetcher";
import { User } from "./types";

export const getUser = async () => {
  const res = await fetcherProtected.get<User>("/user");
  return res.data;
};
