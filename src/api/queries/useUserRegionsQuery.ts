import { useQuery } from "@tanstack/react-query";
import { getUserRegions } from "api/region";
import queryKeys from "./queryKeys";

export default function useUserRegionsQuery() {
  return useQuery({
    queryKey: queryKeys.region.userRegions().queryKey,
    queryFn: getUserRegions,
    select: (res) => res.data,
  });
}
