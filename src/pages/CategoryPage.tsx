import AppBar from "@components/AppBar";
import { styled } from "styled-components";
import chevronLeftIcon from "@assets/icon/chevron-left.svg";
import Button from "@components/common/Button/Button";
import CategoryButton from "@components/Category/CategoryButton";

import { useNavigate } from "react-router-dom";

export default function CategoryPage() {
  const navigate = useNavigate();

  const onBackButtonClick = () => {
    navigate("/");
  };

  const onCategoryButtonClick = (categoryTitle: string) => {
    console.log("카테고리", categoryTitle);
  };

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
        {list.map((item) => (
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
`;

const list = [
  { id: 1, title: "전체보기", imageUrl: "https://i.ibb.co/LSkHKbL/star.png" },
  {
    id: 2,
    title: "부동산",
    imageUrl: "https://i.ibb.co/41ScRXr/real-estate.png",
  },
  { id: 3, title: "중고차", imageUrl: "https://i.ibb.co/bLW8sd7/car.png" },
  {
    id: 4,
    title: "디지털기기",
    imageUrl: "https://i.ibb.co/cxS7Fhc/digital.png",
  },
  {
    id: 5,
    title: "생활가전",
    imageUrl: "https://i.ibb.co/F5z7vV9/domestic.png",
  },
  {
    id: 6,
    title: "가구/인테리어",
    imageUrl: "https://i.ibb.co/cyYH5V8/furniture.png",
  },
  { id: 7, title: "유아동", imageUrl: "https://i.ibb.co/VNKYZTK/baby.png" },
  {
    id: 8,
    title: "유아도서",
    imageUrl: "https://i.ibb.co/LrwjRdf/baby-book.png",
  },
  {
    id: 9,
    title: "스포츠/레저",
    imageUrl: "https://i.ibb.co/hXVgTyd/sports.png",
  },
  {
    id: 10,
    title: "여성잡화",
    imageUrl: "https://i.ibb.co/yPwkyg3/woman-accessories.png",
  },
  {
    id: 11,
    title: "여성의류",
    imageUrl: "https://i.ibb.co/4fvj6SC/woman-apparel.png",
  },
  {
    id: 12,
    title: "남성패션/잡화",
    imageUrl: "https://i.ibb.co/wwfyjyB/man-apparel.png",
  },
  { id: 13, title: "게임/취미", imageUrl: "https://i.ibb.co/cwJ74M4/game.png" },
  {
    id: 14,
    title: "뷰티/미용",
    imageUrl: "https://i.ibb.co/cXrrK0m/beauty.png",
  },
  {
    id: 15,
    title: "반려동물용품",
    imageUrl: "https://i.ibb.co/CbwHdNr/pet.png",
  },
  { id: 16, title: "도서/음반", imageUrl: "https://i.ibb.co/7WjKkdt/book.png" },
  {
    id: 17,
    title: "티켓,교환권",
    imageUrl: "https://i.ibb.co/kBhhs2p/ticket.png",
  },
  { id: 18, title: "생활", imageUrl: "https://i.ibb.co/T0mnp8m/kitchen.png" },
];
