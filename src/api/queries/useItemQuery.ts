import { useQuery } from "@tanstack/react-query";

import queryKeys from "./queryKeys";
import { getItem } from "api/item";

export default function useItemQuery() {
  return useQuery({
    queryKey: [queryKeys.items],
    queryFn: getItem,
    select: (res) => res.data,
  });
}
