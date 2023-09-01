import { CategoryType } from "api/category/index";
import { useEffect, useState } from "react";

export default function useCategory(categoryList: CategoryType[] | []) {
  const [tagCategories, setTagCategories] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (categoryList.length === 0) return;

    if (!selectedCategory) {
      const finalThreeCategories = getRandomSubarray(categoryList, 3);
      setTagCategories(finalThreeCategories);
      setSelectedCategory(finalThreeCategories[0].title);
      return;
    }
    const filteredList = categoryList.filter(
      (category) => category.title !== selectedCategory
    );
    const selectedCategoryObject = categoryList.find(
      (category) => category.title === selectedCategory
    );

    if (!selectedCategoryObject) return;

    const twoRandomCategories = getRandomSubarray(filteredList, 2);
    const finalThreeCategories = [
      selectedCategoryObject,
      ...twoRandomCategories,
    ];

    setTagCategories(finalThreeCategories);
  }, [selectedCategory, categoryList]);

  return { tagCategories, selectedCategory, setSelectedCategory };
}

function getRandomSubarray(
  arr: { id: number; title: string; imageUrl: string }[],
  n: number
) {
  const shuffled = arr.slice();

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, n);
}
