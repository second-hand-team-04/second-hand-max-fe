import { useQuery } from "@tanstack/react-query";
import queryKeys from "./queryKeys";
import { getRegionList } from "api/region";
import { getUserRegions } from "api/user";

export function useRegionListQuery() {
  return useQuery({
    queryKey: [queryKeys.regionList],
    queryFn: getRegionList,
    staleTime: Infinity,
    select: (res) => res.data,
  });
}

// ? userRegion 전체적인 관리를 어떤 폴더에서 해야할지 ?
export function useUserRegionListQuery() {
  return useQuery({
    queryKey: [queryKeys.user.regions],
    queryFn: getUserRegions,
    staleTime: Infinity,
    select: (res) => res.data,
  });
}
