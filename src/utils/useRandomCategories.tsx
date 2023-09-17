import { CategoryType } from "api/category/index";
import { useEffect, useState } from "react";

type Props = {
  categoryList: CategoryType[] | [];
  fixedCategoryTitle?: string;
};

export default function useRandomCategories({
  categoryList,
  fixedCategoryTitle,
}: Props) {
  const [categoryTags, setCategoryTags] = useState<CategoryType[]>([]);

  const fixedCategory = categoryList.find(
    (category) => category.title === fixedCategoryTitle
  );
  const [selectedCategoryTag, setSelectedCategoryTag] = useState<CategoryType>(
    fixedCategory || {
      id: 0,
      title: "",
      imageUrl: "",
    }
  );

  useEffect(() => {
    if (categoryList.length === 0) return;

    const remainingCategories = categoryList.slice(1);
    if (selectedCategoryTag.id === 0) {
      const finalThreeCategories = getRandomSubarray(remainingCategories, 3);
      console.log("finalThreeCategories:", finalThreeCategories);
      setCategoryTags(finalThreeCategories);
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

    setCategoryTags(finalThreeCategories);
  }, [selectedCategoryTag, categoryList]);

  return { categoryTags, selectedCategoryTag, setSelectedCategoryTag };
}

function getRandomSubarray<T>(arr: Array<T>, n: number) {
  const shuffled = arr.slice();

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, n);
}
