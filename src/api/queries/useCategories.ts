import { useQuery } from "@tanstack/react-query";
import { getCategories } from "api/user";
import { categoryKeys } from "./queryKeys";

export default function useCategories() {
  return useQuery({
    queryKey: [categoryKeys.categories],
    queryFn: getCategories,
    staleTime: Infinity,
  });
}