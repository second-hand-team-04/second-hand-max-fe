import { ModalListItem } from "@components/common/Modal/ModalStyles";

type RegionItem = {
  id: number;
  title: string;
};

export default function RegionItem({
  item,
  onClick,
}: {
  item: RegionItem;
  onClick: (itemId: number) => void;
}) {
  return (
    <ModalListItem onClick={() => onClick(item.id)} key={item.id}>
      {item.title}
    </ModalListItem>
  );
}
