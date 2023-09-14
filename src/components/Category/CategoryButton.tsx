import Button from "@components/common/Button/Button";
import { ProductItemsFiltersContext } from "@context/ProductItemsFiltersContext";
import { CategoryType } from "api/category/index";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Routes from "router/Routes";
import { styled } from "styled-components";

type Props = {
  item: CategoryType;
};

export default function CategoryButton({ item }: Props) {
  const navigate = useNavigate();
  const { onChangeSelectedCategory } = useContext(ProductItemsFiltersContext);

  const switchCategory = (item: CategoryType) => {
    onChangeSelectedCategory({ id: item.id, title: item.title });
    navigate(Routes.HOME);
  };
  return (
    <StyledCategoryButton variant="plain" onClick={() => switchCategory(item)}>
      <CategoryImage src={item.imageUrl} alt={item.title} />
      <CategoryTitle>{item.title}</CategoryTitle>
    </StyledCategoryButton>
  );
}

const StyledCategoryButton = styled(Button)`
  width: 80px;
  height: 68px;
  gap: 8px;
  padding: 0;
`;

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
