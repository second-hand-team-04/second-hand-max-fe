import { ModalListItem } from "@components/common/Modal/ModalStyles";
import { CategoryType } from "api/user/types";

type Props = {
  item: CategoryType;
  onClick: (itemTitle: string) => void;
  isSelected: boolean;
};

export default function CategoryItem({ item, onClick, isSelected }: Props) {
  return (
    <ModalListItem $isSelected={isSelected} onClick={() => onClick(item.title)}>
      {item.title}
    </ModalListItem>
  );
}
