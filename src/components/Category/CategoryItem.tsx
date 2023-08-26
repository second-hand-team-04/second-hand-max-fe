import { ModalListItem } from "@components/common/Modal/ModalStyles";

type Props = {
  item: { id: number; title: string; imageUrl: string };
  onClick: (itemId: number) => void;
  selectedCategoryId: number;
};

export default function CategoryItem({
  item,
  onClick,
  selectedCategoryId,
}: Props) {
  const isSelected = item.id === selectedCategoryId;

  return (
    <ModalListItem $isSelected={isSelected} onClick={() => onClick(item.id)}>
      {item.title}
    </ModalListItem>
  );
}
