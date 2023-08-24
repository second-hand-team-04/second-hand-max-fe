import { ModalListItem } from "@styles/modal/modalStyles";

type Props = {
  item: { id: number; title: string; imageUrl: string };
  onClick: (itemId: number) => void;
  selectedCategory: number;
};

export default function CategoryItem({
  item,
  onClick,
  selectedCategory,
}: Props) {
  
  const isSelected = item.id === selectedCategory;

  return (
    <ModalListItem $isSelected={isSelected} onClick={() => onClick(item.id)}>
      {item.title}
      {/* 이미지 확인용 */}
      {/* <img width="40px" height="40px" src={item.imageUrl} alt={item.title} /> */}
    </ModalListItem>
  );
}
