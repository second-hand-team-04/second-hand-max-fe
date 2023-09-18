import { ModalListItem } from "@components/common/Modal/ModalStyles";
import { CategoryTag } from "@utils/useRandomCategories";

type Props = {
  item: CategoryTag;
  onClick: (category: CategoryTag) => void;
  isSelected: boolean;
};

export default function CategoryItem({ item, onClick, isSelected }: Props) {
  return (
    <ModalListItem $isSelected={isSelected} onClick={() => onClick(item)}>
      {item.title}
    </ModalListItem>
  );
}
