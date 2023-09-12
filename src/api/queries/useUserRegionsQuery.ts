import { useQuery } from "@tanstack/react-query";
import queryKeys from "./queryKeys";
import { getUserRegions } from "api/region";

export default function useUserRegionsQuery() {
  return useQuery({
    queryKey: queryKeys.region.userRegions.queryKey,
    queryFn: getUserRegions,
    staleTime: Infinity,
    select: (res) => res.data,
  });
}
