import Button from "@components/common/Button/Button";
import { styled } from "styled-components";

export default function CategoryButton({
  item,
  onCategoryButtonClick,
}: {
  item: {
    id: number;
    title: string;
    imageUrl: string;
  };
  onCategoryButtonClick: () => void;
}) {
  return (
    <Button
      variant="plain"
      style={{
        width: "80px",
        height: "68px",
        gap: "8px",
        padding: "0",
      }}
      onClick={onCategoryButtonClick}>
      <CategoryImage>
        <img src={item.imageUrl} alt={item.title} />
      </CategoryImage>
      <CategoryTitle>{item.title}</CategoryTitle>
    </Button>
  );
}

const CategoryImage = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CategoryTitle = styled.div`
  font: ${({ theme: { font } }) => font.displayDefault12};
  color: ${({ theme: { color } }) => color.neutral.text};
`;
