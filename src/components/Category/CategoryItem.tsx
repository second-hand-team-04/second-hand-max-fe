import { ModalListItem } from "@components/common/Modal/ModalStyles";
import { CategoryType } from "api/category";

type Props = {
  item: CategoryType;
  onClick: (category: CategoryType) => void;
  isSelected: boolean;
};

export default function CategoryItem({ item, onClick, isSelected }: Props) {
  return (
    <ModalListItem $isSelected={isSelected} onClick={() => onClick(item)}>
      {item.title}
    </ModalListItem>
  );
}
