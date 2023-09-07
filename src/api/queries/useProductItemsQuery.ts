import { useQuery } from "@tanstack/react-query";

import queryKeys from "./queryKeys";
import { getProductItems } from "api/productItem";

export default function useItemQuery() {
  return useQuery({
    queryKey: [queryKeys.items],
    queryFn: getProductItems,
    select: (res) => res.data,
  });
}
