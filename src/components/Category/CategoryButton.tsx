import Button from "@components/common/Button/Button";
import { styled } from "styled-components";
import { CategoryType } from "../../utils/useCategory";

type Props = {
  item: CategoryType;
  onCategoryButtonClick: (categoryTitle: string) => void;
};

export default function CategoryButton({ item, onCategoryButtonClick }: Props) {
  return (
    <Button
      variant="plain"
      style={{
        width: "80px",
        height: "68px",
        gap: "8px",
        padding: "0",
      }}
      onClick={() => onCategoryButtonClick(item.title)}>
      <CategoryImage src={item.imageUrl} alt={item.title} />
      <CategoryTitle>{item.title}</CategoryTitle>
    </Button>
  );
}

const CategoryImage = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 8px;
  object-fit: cover;
`;

const CategoryTitle = styled.div`
  font: ${({ theme: { font } }) => font.displayDefault12};
  color: ${({ theme: { color } }) => color.neutral.text};
`;
