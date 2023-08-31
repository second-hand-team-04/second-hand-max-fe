import { CategoryType } from "api/user/types";
import { useEffect, useState } from "react";



export default function useCategory(categoryList: CategoryType[]) {
  const initialCategories = getRandomSubarray(categoryList, 3);
  const initialSelection = initialCategories[0].title;

  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState(initialSelection);

  useEffect(() => {
    if (!selectedCategory) return;

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

    setCategories(finalThreeCategories);
  }, [selectedCategory, categoryList]);

  return { selectedCategory, categories, setSelectedCategory };
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
