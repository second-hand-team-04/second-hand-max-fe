import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "api/user";
import queryKeys from "./queryKeys";

export default function useUserInfoQuery() {
  return useQuery({
    queryKey: queryKeys.user.info().queryKey,
    queryFn: getUserInfo,
    retry: false,
    select: (res) => res.data,
  });
}
