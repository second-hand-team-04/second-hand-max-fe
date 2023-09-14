import { useQuery } from "@tanstack/react-query";
import { getAllRegions } from "api/region";
import queryKeys from "./queryKeys";

export default function useAllRegionsQuery() {
  return useQuery({
    queryKey: queryKeys.region.all().queryKey,
    queryFn: getAllRegions,
    staleTime: Infinity,
    select: (res) => res.data,
  });
}
