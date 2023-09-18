import { CategoryType } from "api/category/index";
import { useEffect, useState } from "react";
import { getRandomSubarray } from "../utils/getRandomSubarray";

export type CategoryTag = Pick<CategoryType, "id" | "title">;

type Props = {
  categoryList: CategoryType[];
  prevCategory?: CategoryTag;
  randomCategoriesLength?: number;
};

export default function useRandomCategories({
  categoryList,
  prevCategory,
  randomCategoriesLength = 3,
}: Props) {
  const [threeCategoryTags, setThreeCategoryTags] = useState<CategoryTag[]>([]);

  const [selectedCategoryTag, setSelectedCategoryTag] = useState<CategoryTag>(
    prevCategory || {
      id: 0,
      title: "",
    }
  );

  const onCategoryTagSelect = (category: CategoryTag) => {
    setSelectedCategoryTag(category);
  };

  useEffect(() => {
    if (categoryList.length === 0) return;

    if (selectedCategoryTag.id === 0) {
      const finalThreeCategories = getRandomSubarray(
        categoryList.slice(1),
        randomCategoriesLength
      );
      setThreeCategoryTags(finalThreeCategories);
      setSelectedCategoryTag(finalThreeCategories[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryList, randomCategoriesLength]);

  useEffect(() => {
    if (categoryList.length === 0 || selectedCategoryTag.id === 0) return;

    const remainingCategories = categoryList.slice(1);
    const filteredList = remainingCategories.filter(
      (category) => category.title !== selectedCategoryTag.title
    );

    const selectedCategoryObject = remainingCategories.find(
      (category) => category.title === selectedCategoryTag.title
    );

    if (!selectedCategoryObject) return;

    const twoRandomCategories = getRandomSubarray(
      filteredList,
      randomCategoriesLength - 1
    );
    const finalThreeCategories = [
      selectedCategoryObject,
      ...twoRandomCategories,
    ];

    setThreeCategoryTags(finalThreeCategories);
  }, [categoryList, randomCategoriesLength, selectedCategoryTag]);

  return {
    threeCategoryTags,
    selectedCategoryTag,
    onCategoryTagSelect,
    setSelectedCategoryTag,
  };
}
