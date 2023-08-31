import AppBar from "@components/AppBar";
import { styled } from "styled-components";
import chevronLeftIcon from "@assets/icon/chevron-left.svg";
import Button from "@components/common/Button/Button";
import CategoryButton from "@components/Category/CategoryButton";
import { useNavigate } from "react-router-dom";
import useCategoriesQuery from "api/queries/useCategoriesQuery";

export default function CategoryPage() {
  const navigate = useNavigate();

  const { data: categories, isFetched } = useCategoriesQuery();

  const onBackButtonClick = () => {
    navigate("/");
  };

  const onCategoryButtonClick = (categoryTitle: string) => {
    console.log("카테고리", categoryTitle);
  };

  if (!isFetched) return <div>로딩중...</div>;

  return (
    <StyledCategoryPage>
      <AppBar>
        <Button
          onClick={onBackButtonClick}
          style={{ flexDirection: "row", width: "86px" }}
          variant="plain">
          <img src={chevronLeftIcon} alt="chevronLeftIcon" />
          <BackButtonText>뒤로</BackButtonText>
        </Button>
        <TitleArea>카테고리</TitleArea>
      </AppBar>
      <MainBody>
        {categories &&
          categories.data.map((item) => (
            <CategoryButton
              key={item.id}
              item={item}
              onCategoryButtonClick={onCategoryButtonClick}
            />
          ))}
      </MainBody>
    </StyledCategoryPage>
  );
}

const StyledCategoryPage = styled.div`
  position: relative;
  width: 393px;
  height: 852px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BackButtonText = styled.div`
  padding: 0 8px;
  font: ${({ theme: { font } }) => font.availableStrong16};
  color: ${({ theme: { color } }) => color.neutral.text};
`;

const TitleArea = styled.div`
  position: relative;
  left: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 40px;
  padding: 8px 35px 8px 36px;
  font: ${({ theme: { font } }) => font.displayStrong16};
  color: ${({ theme: { color } }) => color.neutral.text};
`;

const MainBody = styled.div`
  position: relative;
  top: 56px;
  width: 100%;
  height: 796px;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(3, 80px);
  grid-template-rows: repeat(6, 68px);
  gap: 32px;
  padding: 40px;
  background: ${({ theme: { color } }) => color.neutral.background};
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
