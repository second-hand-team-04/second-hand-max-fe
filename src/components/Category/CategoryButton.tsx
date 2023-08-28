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
    <StyledCategoryButton onClick={onCategoryButtonClick}>
      <CategoryImage>
        <img src={item.imageUrl} alt={item.title} />
      </CategoryImage>
      <CategoryTitle>{item.title}</CategoryTitle>
    </StyledCategoryButton>
  );
}

const StyledCategoryButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  height: 68px;
  gap: 8px;
  justify-content: space-between;
`;

const CategoryImage = styled.div`
  display: flex;
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
