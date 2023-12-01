import { useQuery } from "@tanstack/react-query";
import { getUserRegions } from "api/region";
import { regionKeys } from "./queryKey";

export default function useUserRegionsQuery() {
  return useQuery({
    queryKey: regionKeys.userRegions().queryKey,
    queryFn: getUserRegions,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    select: (res) => res.data,
    meta: {
      errorMessage: "동네 목록을 불러오는데 실패했습니다",
    },
  });
}
