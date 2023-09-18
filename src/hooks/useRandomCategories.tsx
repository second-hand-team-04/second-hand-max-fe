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

    const remainingCategories = categoryList.slice(1).map(({ id, title }) => {
      return { id, title };
    });
    if (selectedCategoryTag.id === 0) {
      const finalThreeCategories = getRandomSubarray(
        remainingCategories,
        randomCategoriesLength
      );
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

    const twoRandomCategories = getRandomSubarray(
      filteredList,
      randomCategoriesLength - 1
    );
    const finalThreeCategories = [
      selectedCategoryObject,
      ...twoRandomCategories,
    ];

    setThreeCategoryTags(finalThreeCategories);
  }, [selectedCategoryTag, categoryList, randomCategoriesLength]);

  return {
    threeCategoryTags,
    selectedCategoryTag,
    onCategoryTagSelect,
    setSelectedCategoryTag,
  };
}
