import { useQuery } from "@tanstack/react-query";
import queryKeys from "./queryKeys";
import { getRegionList } from "api/region";

export default function useRegionListQuery() {
  return useQuery({
    queryKey: [queryKeys.regionList],
    queryFn: getRegionList,
    staleTime: Infinity,
  });
}
