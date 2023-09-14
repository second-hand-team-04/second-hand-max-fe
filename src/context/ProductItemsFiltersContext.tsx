import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "api/queries/queryKeys";
import useUserRegionsQuery from "api/queries/useUserRegionsQuery";
import { ReactNode, createContext, useEffect, useState } from "react";

type FilterType = {
  id: number;
  title: string;
};

export const ProductItemsFiltersContext = createContext<{
  selectedRegion: FilterType;
  selectedCategory: FilterType;
  onChangeSelectedRegion: (newRegion: FilterType) => void;
  onChangeSelectedCategory: (newCategory: FilterType) => void;
}>({
  selectedRegion: { id: 1, title: "역삼1동" },
  selectedCategory: { id: 1, title: "전체보기" },
  onChangeSelectedRegion: () => {},
  onChangeSelectedCategory: () => {},
});

export function ProductItemsFiltersProvider({
  children,
}: {
  children: ReactNode;
}) {
  const queryClient = useQueryClient();

  const { data: userRegions, isSuccess: isSuccessUserRegions } =
    useUserRegionsQuery();

  const [selectedRegion, setSelectedRegion] = useState({
    id: 1,
    title: "역삼1동",
  });
  const [selectedCategory, setSelectedCategory] = useState({
    id: 1,
    title: "전체보기",
  });

  const onChangeSelectedRegion = (newRegion: FilterType) => {
    setSelectedRegion(newRegion);
    queryClient.invalidateQueries(queryKeys.region.userRegions().queryKey);
  };

  const onChangeSelectedCategory = (newSelectedCategory: {
    id: number;
    title: string;
  }) => {
    setSelectedCategory(newSelectedCategory);
  };

  useEffect(() => {
    if (isSuccessUserRegions) {
      const userSelectedRegionId = userRegions.selectedId;
      const userSelectedRegion = userRegions.regions.find(
        (region) => region.id === userSelectedRegionId
      );
      if (userSelectedRegion) {
        onChangeSelectedRegion(userSelectedRegion);
      }
    }
  }, [isSuccessUserRegions, userRegions]);

  return (
    <ProductItemsFiltersContext.Provider
      value={{
        selectedRegion,
        selectedCategory,
        onChangeSelectedRegion,
        onChangeSelectedCategory,
      }}>
      {children}
    </ProductItemsFiltersContext.Provider>
  );
}
