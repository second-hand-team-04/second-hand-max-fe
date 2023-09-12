import { useQuery } from "@tanstack/react-query";
import queryKeys from "./queryKeys";
import { getUserInfo } from "api/user";

export default function useUserInfoQuery() {
  return useQuery({
    queryKey: queryKeys.user.info().queryKey,
    queryFn: getUserInfo,
    retry: false,
    select: (res) => res.data,
  });
}
