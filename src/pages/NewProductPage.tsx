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
import useCategory from "@utils/useCategory";
import { useNavigate } from "react-router-dom";
import useImageInput from "@hooks/useImageInput";
import useCategoriesQuery from "api/queries/useCategoriesQuery";
import useText from "@hooks/useText";
import { formatAsPrice } from "@utils/stringFormatters";
import Routes from "router/Routes";

export default function NewProductPage() {
  const navigate = useNavigate();

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isPictureHover, setIsPictureHover] = useState(false);
  const [pictureList, setPictureList] = useState<File[]>([]);

  const { value: titleInputValue, onChange: onTitleInputChange } = useText();
  const { value: contentInputValue, onChange: onContentInputChange } =
    useText();
  const { value: priceInputValue, onChange: onChangeForPrice } = useText();

  const { data: categories, isLoading } = useCategoriesQuery();
  const { tagCategories, selectedCategory, setSelectedCategory } = useCategory(
    categories ?? []
  );
  const [selectedTag, setSelectedTag] = useState(selectedCategory);

  const { scrollContainerRef, onDragStart, onDragMove, onDragEnd } =
    useDraggable();
  const {
    imageFile: productPictureImage,
    error: imageFileError,
    onChange: onProductPictureChange,
  } = useImageInput({ sizeLimit: 2000000 });

  useEffect(() => {
    setSelectedTag(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (productPictureImage) {
      setPictureList((prevList) => [...prevList, productPictureImage]);
    }
  }, [productPictureImage]);

  const onShowScrollBar = () => {
    setIsPictureHover(true);
  };

  const onDragSlideEnd = () => {
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

  const onPriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 12) return;

    onChangeForPrice(e);
  };

  const onAddPicture = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (pictureList.length >= 10) return;
    const inputFile = e.currentTarget.querySelector('input[type="file"]');
    if (inputFile as HTMLInputElement) {
      (inputFile as HTMLInputElement).click();
    }
  };

  const onDeletePicture = (pictureId: number) => {
    setPictureList((prevList) =>
      prevList.filter((picture) => picture.lastModified !== pictureId)
    );
  };

  const onPost = () => {
    console.log(
      "Post",
      pictureList,
      titleInputValue,
      selectedTag,
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

  if (isLoading) return <div>로딩중</div>;

  return (
    <StyledNewProductPage>
      {isCategoryOpen ? (
        <CategoryModal
          categoryList={categories ?? []}
          currentSelectedCategory={selectedCategory}
          onCategoryModalClose={onCategoryClose}
          onCategoryItemSelect={onCategoryItemSelect}
        />
      ) : null}
      <AppBar>
        <Button
          style={{ width: "62px" }}
          variant="plain"
          onClick={() => navigate(Routes.HOME)}>
          <CloseButtonText>닫기</CloseButtonText>
        </Button>
        <TitleArea style={{ flexGrow: "1" }}>내 물건 팔기</TitleArea>
        <Button style={{ width: "62px" }} variant="plain">
          <CompleteButtonText onClick={onPost} $isValid={isValid}>
            완료
          </CompleteButtonText>
        </Button>
      </AppBar>
      <Main>
        <Container>
          <ImageInputError>{imageFileError}</ImageInputError>
          <PictureArea
            ref={scrollContainerRef}
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragSlideEnd}
            onMouseEnter={onShowScrollBar}
            $isPictureHover={isPictureHover}>
            <AddButton onClick={onAddPicture}>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={(input) => {
                  if (input)
                    input.onclick = (e) => {
                      (e.target as HTMLInputElement).value = "";
                    };
                }}
                onChange={onProductPictureChange}
              />
              <img src={cameraIcon} alt="camera" />
              <PictureCount>{pictureList.length}/10</PictureCount>
            </AddButton>
            {pictureList &&
              pictureList.map((picture: File) => {
                const imageUrl = URL.createObjectURL(picture);
                return (
                  <PictureWrapper key={picture.lastModified}>
                    <Picture src={imageUrl} alt={picture.name} />
                    <Button
                      onClick={() => onDeletePicture(picture.lastModified)}
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
                );
              })}
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
                  {tagCategories.map(
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
              value={formatAsPrice(priceInputValue) || ""}
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

const ImageInputError = styled.p`
  top: 60px;
  height: 18px;
  position: absolute;
  margin-bottom: 2px;
  font: ${({ theme: { font } }) => font.availableDefault12};
  font-size: 10px;
  color: ${({ theme: { color } }) => color.system.warning};
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

const currentRegion = "역삼1동";
