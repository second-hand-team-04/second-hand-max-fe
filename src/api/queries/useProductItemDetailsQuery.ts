import { useQuery } from "@tanstack/react-query";
import queryKeys from "./queryKeys";
import { getProductItemDetails } from "api/productItem";

export function useProductItemDetailsQuery(id: number) {
  return useQuery({
    queryKey: queryKeys.productItems.detail(id).queryKey,
    queryFn: () => getProductItemDetails(id),
    select: (res) => res.data,
  });
}
