import { CategoryType } from "api/category/index";
import { useEffect, useState } from "react";
import { getRandomSubarray } from "./getRandomSubarray";

export type CategoryTag = Pick<CategoryType, "id" | "title">;

type Props = {
  categoryList: CategoryType[] | [];
  prevCategory?: CategoryTag;
};

export default function useRandomCategories({
  categoryList,
  prevCategory,
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

    const remainingCategories = categoryList.slice(1);
    if (selectedCategoryTag.id === 0) {
      const finalThreeCategories = getRandomSubarray(remainingCategories, 3);
      setThreeCategoryTags(finalThreeCategories);
      setSelectedCategoryTag(finalThreeCategories[0]);
      return;
    }
    const filteredList = remainingCategories.filter(
      (category) => category.title !== selectedCategoryTag.title
    );

    const selectedCategoryObject = remainingCategories.find(
      (category) => category.title === selectedCategoryTag.title
    );

    if (!selectedCategoryObject) return;

    const twoRandomCategories = getRandomSubarray(filteredList, 2);
    const finalThreeCategories = [
      selectedCategoryObject,
      ...twoRandomCategories,
    ];

    setThreeCategoryTags(finalThreeCategories);
  }, [selectedCategoryTag, categoryList]);

  return {
    threeCategoryTags,
    selectedCategoryTag,
    onCategoryTagSelect,
    setSelectedCategoryTag,
  };
}
