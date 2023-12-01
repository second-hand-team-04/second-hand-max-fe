import { useQuery } from "@tanstack/react-query";
import { getProductItemDetails } from "api/productItem";
import { productItemsKeys } from "./queryKey";

export function useProductItemDetailsQuery(id: number) {
  return useQuery({
    queryKey: productItemsKeys.detail(id).queryKey,
    queryFn: () => getProductItemDetails(id),
    select: (res) => res.data,
  });
}
