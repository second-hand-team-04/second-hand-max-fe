import { useQuery } from "@tanstack/react-query";
import { userKeys } from "./queryKeys";
import { getUser } from "api/user";

// TODO: Remove
export default function useUser() {
  return useQuery({
    queryKey: [userKeys.user],
    queryFn: getUser,
    staleTime: Infinity,
    retry: 0,
    refetchOnWindowFocus: false,
  });
}
