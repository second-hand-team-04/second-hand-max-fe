import { useQuery } from "@tanstack/react-query";
import queryKeys from "./queryKeys";
import { getRegionList, getUserRegions } from "api/region";

export function useRegionListQuery() {
  return useQuery({
    queryKey: queryKeys.region.all.queryKey,
    queryFn: getRegionList,
    staleTime: Infinity,
    select: (res) => res.data,
  });
}

export function useUserRegionListQuery() {
  return useQuery({
    queryKey: queryKeys.region.userRegions.queryKey,
    queryFn: getUserRegions,
    staleTime: Infinity,
    select: (res) => res.data,
  });
}
