import { useQuery } from "@tanstack/react-query";
import { getCategories } from "api/category";
import { categoryKeys } from "./queryKey";

export default function useCategoriesQuery() {
  return useQuery({
    queryKey: [categoryKeys.list()],
    queryFn: getCategories,
    staleTime: Infinity,
    select: (res) => res.data,
  });
}
