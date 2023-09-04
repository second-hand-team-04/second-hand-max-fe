import { useQuery } from "@tanstack/react-query";
import queryKeys from "./queryKeys";
import { getUserInfo } from "api/user";

export default function useUserQuery() {
  return useQuery({
    queryKey: queryKeys.user.info().queryKey,
    queryFn: getUserInfo,
    enabled: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
