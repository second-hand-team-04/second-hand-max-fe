import { useQuery } from "@tanstack/react-query";
import { getCategories } from "api/category";
import { queryKeys } from "./queryKeys";

export default function useCategoriesQuery() {
  return useQuery({
    // queryKey: [categoryKeys.categories],
    queryKey: [queryKeys.categories],
    queryFn: getCategories,
    staleTime: Infinity,
    select: (res) => res.data,
  });
}
