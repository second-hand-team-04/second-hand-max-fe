import useUserRegionPatchMutation from "api/region/queries/useUserRegionPatchMutation";
import useUserRegionsQuery from "api/region/queries/useUserRegionsQuery";
import { HTTPSTATUS } from "api/types";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

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
  selectedRegion: { id: 432, title: "역삼동" },
  selectedCategory: { id: 1, title: "전체보기" },
  onChangeSelectedRegion: () => {},
  onChangeSelectedCategory: () => {},
});

export function ProductItemsFiltersProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { data: userRegions, isSuccess: isSuccessUserRegions } =
    useUserRegionsQuery();
  const { mutateAsync: userUserRegionPatchMutateAsync } =
    useUserRegionPatchMutation();

  const [selectedRegion, setSelectedRegion] = useState({
    id: 1,
    title: "역삼동",
  });
  const [selectedCategory, setSelectedCategory] = useState({
    id: 1,
    title: "전체보기",
  });

  const onChangeSelectedRegion = useCallback(
    async (newRegion: FilterType) => {
      const res = await userUserRegionPatchMutateAsync(newRegion.id);
      if (res.code === HTTPSTATUS.success) {
        setSelectedRegion(newRegion);
      }
    },
    [userUserRegionPatchMutateAsync]
  );

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
        setSelectedRegion(userSelectedRegion);
      }
    }
  }, [isSuccessUserRegions, onChangeSelectedRegion, userRegions]);

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
