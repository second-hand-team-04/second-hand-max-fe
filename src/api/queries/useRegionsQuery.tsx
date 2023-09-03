import { useQuery } from "@tanstack/react-query";
import { regionKeys } from "./queryKeys";
import { getRegionList } from "api/region";

export default function useRegionListQuery() {
  return useQuery({
    queryKey: [regionKeys.regionList],
    queryFn: getRegionList,
    staleTime: Infinity,
  });
}
