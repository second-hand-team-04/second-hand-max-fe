import { ModalListItem } from "@components/common/Modal/ModalStyles";
import { CategoryType } from "./useCategory";

type Props = {
  item: CategoryType;
  onClick: (itemTitle: string) => void;
  currentSelectedCategory: string;
};

export default function CategoryItem({
  item,
  onClick,
  currentSelectedCategory,
}: Props) {
  return (
    <ModalListItem
      $isSelected={item.title === currentSelectedCategory}
      onClick={() => onClick(item.title)}>
      {item.title}
    </ModalListItem>
  );
}
