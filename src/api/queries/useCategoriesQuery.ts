import { useQuery } from "@tanstack/react-query";
import { getCategories } from "api/category";
import { categoryKeys } from "./queryKeys";

export default function useCategoriesQuery() {
  return useQuery({
    queryKey: [categoryKeys.categories],
    queryFn: getCategories,
    staleTime: Infinity,
  });
}
