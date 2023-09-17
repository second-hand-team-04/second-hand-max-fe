import cameraIcon from "@assets/icon/camera.svg";
import chevronRightIcon from "@assets/icon/chevron-right.svg";
import circleXIcon from "@assets/icon/circle-x-filled.svg";
import mapIcon from "@assets/icon/map-pin-filled.svg";
import AppBar from "@components/AppBar";
import CategoryModal from "@components/Category/CategoryModal";
import Button from "@components/common/Button/Button";
import { Tag } from "@components/common/Tag/Tag";
import { ProductItemsFiltersContext } from "@context/ProductItemsFiltersContext";
import useDraggable from "@hooks/useDraggable";
import useText from "@hooks/useText";
import { checkForChanges } from "@utils/objectDifferences";
import {
  formatAsNumber,
  formatAsPrice,
  keepLastRegion,
} from "@utils/stringFormatters";
import useRandomCategories from "@utils/useRandomCategories";
import { CategoryType } from "api/category";
import { fetcher } from "api/fetcher";
import { PictureType } from "api/productItem";
import useCategoriesQuery from "api/queries/useCategoriesQuery";
import { useProductItemDetailsQuery } from "api/queries/useProductItemDetailsQuery";
import useProductItemEditMutation from "api/queries/useProductItemEditMutation";
import { AxiosError } from "axios";
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";

export default function EditProductItemPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: productItemDetails } = useProductItemDetailsQuery(Number(id));

  const { mutate: productItemEditMutate } = useProductItemEditMutation(
    Number(id)
  );

  // const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isPictureHover, setIsPictureHover] = useState(false);
  const [pictureList, setPictureList] = useState<PictureType[]>(
    productItemDetails?.images ?? []
  );

  // const [currentCategoryId, setCurrentCategoryId] = useState(
  //   productItemDetails?.category
  // ); // ! id로 가져오면 무슨 카테고리인지 알 수가 없음
  // const [currentRegionId, setCurrentRegionId] = useState(
  //   productItemDetails?.regionId
  // ); // ! id로 가져오면 무슨 동네인지 알 수가 없음

  const { value: titleInputValue, onChange: onTitleInputChange } = useText({
    initialValue: productItemDetails?.title,
  });
  const { value: contentInputValue, onChange: onContentInputChange } = useText({
    initialValue: productItemDetails?.content,
  });
  const { value: priceInputValue, onChange: onChangeForPrice } = useText({
    initialValue: String(productItemDetails?.price),
  });

  const { selectedRegion, selectedCategory: selectedCategoryData } = useContext(
    ProductItemsFiltersContext
  );

  const initialValues = useRef({
    title: titleInputValue,
    content: contentInputValue,
    price: priceInputValue,
    pictureList: [...pictureList],
    // categoryId: currentCategoryId,
    // regionId: currentRegionId,
  });

  const [isValueChanged, setIsValueChanged] = useState(false);

  const updatedData = {
    title: titleInputValue,
    price: Number(formatAsNumber(priceInputValue)),
    content: contentInputValue,
    imageIds: pictureList.map((picture) => picture.id),
    categoryId: selectedCategoryData.id,
    regionId: selectedRegion.id,
  };

  const { data: categories, isLoading } = useCategoriesQuery();
  const { categoryTags, selectedCategoryTag, setSelectedCategoryTag } =
    useRandomCategories({
      categoryList: categories ?? [],
      fixedCategoryTitle: productItemDetails
        ? productItemDetails?.category
        : "",
    });

  const { scrollContainerRef, onDragStart, onDragMove, onDragEnd } =
    useDraggable();
  // const {
  //   imageFile: productPictureImage,
  //   error: imageFileError,
  //   onChange: onProductPictureChange,
  // } = useImageInput({ sizeLimit: 2000000 });

  useEffect(() => {
    const currentValues = {
      title: titleInputValue,
      content: contentInputValue,
      price: priceInputValue,
      pictureList: [...pictureList],
      // categoryId: currentCategoryId,
      // regionId: currentRegionId,
    };

    setIsValueChanged(checkForChanges(initialValues.current, currentValues));
  }, [titleInputValue, contentInputValue, priceInputValue, pictureList]);

  // useEffect(() => {
  //   if (productPictureImage) {
  //     setPictureFileList((prevList) => [...prevList, productPictureImage]);
  //     setPictureList((prevList) => [
  //       ...prevList,
  //       {
  //         id: productPictureImage.lastModified,
  //         url: URL.createObjectURL(productPictureImage),
  //       },
  //     ]);
  //   }
  // }, [productPictureImage]);

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

  const onCategoryItemSelect = (category: CategoryType) => {
    setSelectedCategoryTag(category);
  };

  const onPriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 12) return;

    onChangeForPrice(e);
  };

  const onImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files;

      if (!files) return;

      const newImageFile = files[0];

      const formData = new FormData();
      formData.append(
        "request",
        new Blob([JSON.stringify({ type: "item" })], {
          type: "application/json",
        })
      );

      formData.append("image", newImageFile);

      const res = await fetcher.post("/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.code === 200) {
        const id = res.data.data.id;
        const imageUrl = res.data.data.imageUrl;
        setPictureList((prevList) => [...prevList, { id, imageUrl }]);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error(String(error));
    }
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
      prevList.filter((picture) => picture.id !== pictureId)
    );
  };

  const onUpdatedProductSubmit = async () => {
    productItemEditMutate(updatedData);
  };

  const isValid =
    titleInputValue.length > 0 &&
    contentInputValue.length > 0 &&
    pictureList.length > 0 &&
    pictureList.length <= 10 &&
    isValueChanged;

  // TODO
  if (isLoading) return <div>로딩중</div>;

  return (
    <StyledNewProductPage>
      {isCategoryOpen ? (
        <CategoryModal
          categoryList={categories ?? []}
          currentSelectedCategory={selectedCategoryTag}
          onCategoryModalClose={onCategoryClose}
          onCategoryItemSelect={onCategoryItemSelect}
        />
      ) : null}
      <AppBar>
        <Button
          style={{ width: "62px" }}
          variant="plain"
          onClick={() => navigate("/")}>
          <CloseButtonText>닫기</CloseButtonText>
        </Button>
        <TitleArea style={{ flexGrow: "1" }}>내 물건 팔기</TitleArea>
        <Button style={{ width: "62px" }} variant="plain">
          <CompleteButtonText
            onClick={onUpdatedProductSubmit}
            $isValid={isValid}>
            완료
          </CompleteButtonText>
        </Button>
      </AppBar>
      <Main>
        <Container>
          {/* <ImageInputError>{imageFileError}</ImageInputError> */}
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
                onChange={onImageUpload}
              />
              <img src={cameraIcon} alt="camera" />
              <PictureCount>{pictureList.length}/10</PictureCount>
            </AddButton>
            {pictureList &&
              pictureList.map((picture) => {
                const imageUrl = picture.imageUrl;
                return (
                  <PictureWrapper key={picture.id}>
                    <Picture src={imageUrl} alt={String(picture.id)} />
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
                );
              })}
          </PictureArea>
          <InputArea>
            <TitleInput
              onChange={onTitleInputChange}
              type="text"
              placeholder="내용을 입력하세요"
              value={titleInputValue}
            />
            {titleInputValue.length > 0 && (
              <CategoryArea>
                <TagArea>
                  {categoryTags.map(
                    (tag: { id: number; title: string; imageUrl: string }) => (
                      <Tag
                        key={tag.id}
                        title={tag.title}
                        isSelected={selectedCategoryTag.title === tag.title}
                        onClick={() => onCategoryItemSelect(tag)}
                      />
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
            value={contentInputValue}
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
          <RegionText>{keepLastRegion(selectedRegion.title)}</RegionText>
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

// const ImageInputError = styled.p`
//   top: 60px;
//   height: 18px;
//   position: absolute;
//   margin-bottom: 2px;
//   font: ${({ theme: { font } }) => font.availableDefault12};
//   font-size: 10px;
//   color: ${({ theme: { color } }) => color.system.warning};
// `;

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
