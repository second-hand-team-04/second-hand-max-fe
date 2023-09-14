import { ReactNode, createContext, useState } from "react";

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
  const [selectedRegion, setSelectedRegion] = useState({
    id: 1,
    title: "역삼1동",
  });
  const [selectedCategory, setSelectedCategory] = useState({
    id: 1,
    title: "전체보기",
  });

  const onChangeSelectedRegion = (newRegion: FilterType) => {
    console.log(newRegion);
    setSelectedRegion(newRegion);
  };

  const onChangeSelectedCategory = (newSelectedCategory: {
    id: number;
    title: string;
  }) => {
    console.log(newSelectedCategory);
    setSelectedCategory(newSelectedCategory);
  };

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
