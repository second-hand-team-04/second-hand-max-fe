import AppBar from "@components/AppBar";
import cameraIcon from "@assets/icon/camera.svg";
import mapIcon from "@assets/icon/map-pin-filled.svg";
import circleXIcon from "@assets/icon/circle-x-filled.svg";
import chevronRightIcon from "@assets/icon/chevron-right.svg";
import Button from "@components/common/Button/Button";
import { styled } from "styled-components";
import useDraggable from "@hooks/useDraggable";
import React, { useEffect, useState } from "react";
import { Tag } from "@components/common/Tag/Tag";
import CategoryModal from "@components/Category/CategoryModal";
import useCategory from "@components/Category/useCategory";

export default function NewProductPage() {
  const [titleInputValue, setTitleInputValue] = useState("");
  const [priceInputValue, setPriceInputValue] = useState("");
  const [contentInputValue, setContentInputValue] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isPictureHover, setIsPictureHover] = useState(false);

  const { categories, selectedCategory, setSelectedCategory } =
    useCategory(categoryList);
  const [selectedTag, setSelectedTag] = useState(selectedCategory);

  const { scrollContainerRef, onDragStart, onDragMove, onDragEnd } =
    useDraggable();

  useEffect(() => {
    setSelectedTag(selectedCategory);
  }, [selectedCategory]);

  const onShowScrollBar = () => {
    setIsPictureHover(true);
  };

  //TODO 이름 어떻게하면 좋을지 고민
  const onMouseLeave = () => {
    onDragEnd();
    setIsPictureHover(false);
  };

  const onCategoryOpen = () => {
    setIsCategoryOpen(true);
  };

  const onCategoryClose = () => {
    setIsCategoryOpen(false);
  };

  const onCategoryItemSelect = (itemTitle: string) => {
    setSelectedCategory(itemTitle);
  };

  const onSelectTag = (tagTitle: string) => {
    setSelectedTag(tagTitle);
  };

  const onTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInputValue(e.target.value);
  };

  const onPriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");

    const formattedValue =
      onlyNumbers === "" ? "" : parseInt(onlyNumbers).toLocaleString("en-US");

    setPriceInputValue(formattedValue);
  };

  const onContentInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentInputValue(e.target.value);
  };

  const onAddPicture = () => {
    console.log("Add Picture");
  };

  const onDeletePicture = (pictureId: number) => {
    console.log("Delete Picture", pictureId);
  };

  const onPost = () => {
    console.log(
      "Post",
      titleInputValue,
      priceInputValue || null,
      contentInputValue,
      currentRegion
    );
  };

  const isValid =
    titleInputValue.length > 0 &&
    contentInputValue.length > 0 &&
    pictureList.length > 0 &&
    pictureList.length <= 10;

  return (
    <StyledNewProductPage>
      <CategoryModal
        isOpen={isCategoryOpen}
        currentSelectedCategory={selectedCategory}
        onCategoryModalClose={onCategoryClose}
        onCategoryItemSelect={onCategoryItemSelect}
      />
      <AppBar>
        <Button style={{ flexDirection: "row", width: "62px" }} variant="plain">
          <CloseButtonText>닫기</CloseButtonText>
        </Button>
        <TitleArea style={{ flexGrow: "1" }}>내 물건 팔기</TitleArea>
        <Button style={{ flexDirection: "row", width: "62px" }} variant="plain">
          <CompleteButtonText onClick={onPost} $isValid={isValid}>
            완료
          </CompleteButtonText>
        </Button>
      </AppBar>
      <Main>
        <Container>
          <PictureArea
            ref={scrollContainerRef}
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onMouseLeave}
            onMouseEnter={onShowScrollBar}
            $isPictureHover={isPictureHover}>
            <AddButton onClick={onAddPicture}>
              <img src={cameraIcon} alt="camera" />
              <PictureCount>{pictureList.length}/10</PictureCount>
            </AddButton>
            {pictureList.map((picture: { id: number; imageUrl: string }) => (
              <PictureWrapper key={picture.id}>
                <Picture src={picture.imageUrl} alt="picture.id" />
                <Button
                  onClick={() => onDeletePicture(picture.id)}
                  variant="plain"
                  style={{
                    zIndex: 10,
                    padding: 0,
                    right: -8,
                    top: -8,
                    position: "absolute",
                  }}>
                  <img src={circleXIcon} alt="delete" />
                </Button>
              </PictureWrapper>
            ))}
          </PictureArea>
          <InputArea>
            <TitleInput
              onChange={onTitleInputChange}
              type="text"
              placeholder="내용을 입력하세요"
            />
            {titleInputValue.length > 0 && (
              <CategoryArea>
                <TagArea>
                  {categories.map(
                    (tag: { id: number; title: string; imageUrl: string }) => (
                      <Tag
                        key={tag.id}
                        tag={tag}
                        isSelected={selectedTag === tag.title}
                        onClick={onSelectTag}>
                        {tag.title}
                      </Tag>
                    )
                  )}
                </TagArea>
                <Button
                  onClick={onCategoryOpen}
                  variant="plain"
                  style={{ padding: "0" }}>
                  <img src={chevronRightIcon} alt="chevronRightIcon" />
                </Button>
              </CategoryArea>
            )}
          </InputArea>
          <InputArea>
            <WonSymbol>₩</WonSymbol>
            <PriceInput
              value={priceInputValue || ""}
              onChange={onPriceInputChange}
              type="text"
              placeholder="가격(선택사항)"
            />
          </InputArea>
          <ContentArea
            onChange={onContentInputChange}
            placeholder="역삼 1동에 올릴 게시물 내용을 작성해주세요.(판매금지 물품은 게시가 제한될 수 있어요.)"
          />
        </Container>
      </Main>
      <AppBar isTop={false} padding="16px" height="64px">
        <Button
          variant="plain"
          style={{
            height: "32px",
            padding: "0",
            display: "flex",
            flexDirection: "row",
            gap: "8px",
          }}>
          <img src={mapIcon} alt="map" />
          <RegionText>{currentRegion}</RegionText>
        </Button>
      </AppBar>
    </StyledNewProductPage>
  );
}

const CategoryArea = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font: ${({ theme: { font } }) => font.availableDefault16};
  color: ${({ theme: { color } }) => color.neutral.textStrong};
`;

const TagArea = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  gap: 4px;
`;

const PictureArea = styled.div<{ $isPictureHover: boolean }>`
  width: inherit;
  padding-top: 8px;
  padding-bottom: ${({ $isPictureHover }) =>
    $isPictureHover ? "8px" : "16px"};
  display: flex;
  gap: 16px;
  border-bottom: 0.8px solid ${({ theme: { color } }) => color.neutral.border};
  overflow-x: scroll;
  flex-shrink: 0;

  &::-webkit-scrollbar {
    display: ${({ $isPictureHover }) => ($isPictureHover ? "auto" : "none")};

    height: 8px;
    border-radius: 16px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme: { color } }) => color.neutral.backgroundBold};

    width: 20px;
    height: 6px;
    border-radius: 16px;
  }
`;

const PictureWrapper = styled.div`
  position: relative;
`;

const RegionText = styled.div`
  font: ${({ theme: { font } }) => font.availableDefault16};
  color: ${({ theme: { color } }) => color.neutral.textStrong};
`;

const WonSymbol = styled.span`
  width: 10px;
  height: 24px;
  font: ${({ theme: { font } }) => font.displayStrong16};
  color: ${({ theme: { color } }) => color.neutral.textStrong};
`;

const ContentArea = styled.textarea`
  font: ${({ theme: { font } }) => font.availableDefault16};
  height: calc(100% - 64px);
  overflow: overlay;
  word-wrap: break-word;

  max-height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }

  &::placeholder {
    color: ${({ theme: { color } }) => color.neutral.textWeak};
  }
`;

const PriceInput = styled.input`
  height: 24px;
  font: ${({ theme: { font } }) => font.availableDefault16};
  color: ${({ theme: { color } }) => color.neutral.textStrong};

  &::placeholder {
    color: ${({ theme: { color } }) => color.neutral.textWeak};
  }
`;

const TitleInput = styled.input`
  height: 24px;
  font: ${({ theme: { font } }) => font.availableDefault16};
  color: ${({ theme: { color } }) => color.neutral.textStrong};

  &::placeholder {
    color: ${({ theme: { color } }) => color.neutral.textWeak};
  }
`;

const InputArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: ${({ theme: { color } }) => color.neutral.textWeak};
  padding-bottom: 16px;
  border-bottom: 0.8px solid ${({ theme: { color } }) => color.neutral.border};
`;

const AddButton = styled.button`
  width: 80px;
  height: 80px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border: 0.8px solid ${({ theme: { color } }) => color.neutral.border};
  border-radius: 16px;
`;

const PictureCount = styled.div`
  font: ${({ theme: { font } }) => font.displayDefault12};
  color: ${({ theme: { color } }) => color.neutral.textStrong};
`;

const Picture = styled.img`
  width: 80px;
  height: 80px;
  border: 0.8px solid ${({ theme: { color } }) => color.neutral.border};
  border-radius: 16px;
`;
const StyledNewProductPage = styled.div`
  width: 393px;
  height: 852px;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ theme: { color } }) => color.neutral.background};
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
  padding: 72px 16px 0px 16px;
`;

const CloseButtonText = styled.div`
  width: 46px;
  height: 24px;
  padding: 0px 8px;
  align-items: center;
  font: ${({ theme: { font } }) => font.availableStrong16};
  color: ${({ theme: { color } }) => color.neutral.text};
`;

const TitleArea = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 40px;

  font: ${({ theme: { font } }) => font.displayStrong16};
  color: ${({ theme: { color } }) => color.neutral.textStrong};
`;

const CompleteButtonText = styled.div<{ $isValid: boolean }>`
  width: 46px;
  height: 24px;
  padding: 0px 8px;
  align-items: center;
  font: ${({ theme: { font } }) => font.availableStrong16};
  color: ${({ theme: { color }, $isValid }) =>
    $isValid ? color.accent.backgroundPrimary : color.neutral.borderStrong};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 361px;
  height: 100%;
  background: ${({ theme: { color } }) => color.neutral.background};
  // box-sizing: border-box;
`;

const pictureList = [
  {
    id: 1,
    imageUrl:
      "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192cf604e7b0e6900f9ac53a43965300eb9a",
  },
  {
    id: 2,
    imageUrl:
      "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192c9f5287469802eca457586a25a096fd31",
  },
  {
    id: 3,
    imageUrl:
      "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192c6fb33a4b4cf43b6605fc7a1e262f0845",
  },
  {
    id: 4,
    imageUrl:
      "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192c960f4ab09fe6e38bae8c63030c9b37f9",
  },
  {
    id: 5,
    imageUrl:
      "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192cce9463e040a07a9462a54df43e1d73f1",
  },
  {
    id: 6,
    imageUrl:
      "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192cac8e738cb631e72fdb9a96b36413984e",
  },
  {
    id: 7,
    imageUrl:
      "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192c7f9f127ae3ca5dc7f0f6349aebcdb3c4",
  },
  {
    id: 8,
    imageUrl:
      "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192c26397d82c8691bdabf557d1536959d9c",
  },
  {
    id: 9,
    imageUrl:
      "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192c66d8fd08427c1f00d04db607cc4cdc8e",
  },
  {
    id: 10,
    imageUrl:
      "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192cd0bbab1214a29e381afae56101ded106",
  },
];

const currentRegion = "역삼1동";

const categoryList = [
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
  {
    id: 19,
    title: "가공식품",
    imageUrl: "https://i.ibb.co/S0rSyxr/processed-foods.png",
  },
  { id: 20, title: "식물", imageUrl: "https://i.ibb.co/rwZhRqh/plant.png" },
  {
    id: 21,
    title: "기타 중고물품",
    imageUrl: "https://i.ibb.co/tCyMPf5/etc.png",
  },
  { id: 22, title: "삽니다", imageUrl: "https://i.ibb.co/g7Gc1w0/buy.png" },
];

// const tagList = getRandomSubarray(categoryList, 3);
