import { useQuery } from "@tanstack/react-query";
import queryKeys from "./queryKeys";
import { getAllRegions } from "api/region";

export default function useAllRegionsQuery() {
  return useQuery({
    queryKey: queryKeys.region.all.queryKey,
    queryFn: getAllRegions,
    staleTime: Infinity,
    select: (res) => res.data,
  });
}
