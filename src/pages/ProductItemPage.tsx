import chevronDownIcon from "@assets/icon/chevron-down.svg";
import chevronLeftIcon from "@assets/icon/chevron-left.svg";
import dotsIcon from "@assets/icon/dots.svg";
import heartIcon from "@assets/icon/heart.svg";
import AppBar from "@components/AppBar";
import { defaultThumbnail } from "@components/Product/ProductItem";
import { Alert } from "@components/common/Alert";
import Button from "@components/common/Button/Button";
import { SelectItem } from "@components/common/SelectInput";
import useOutsideClick from "@hooks/useOutsideClick";
import { formatAsPrice } from "@utils/stringFormatters";
import { convertPastTimestamp } from "@utils/time";
import useProductItemDeleteMutation from "api/queries/useProductItemDeleteMutation";
import { useProductItemDetailsQuery } from "api/queries/useProductItemDetailsQuery";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";

export default function ProductItemPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: productItemDetails, isLoading: isLoadingProductItemdetails } =
    useProductItemDetailsQuery(Number(id));
  const { mutateAsync: deleteProductMutation } = useProductItemDeleteMutation(
    Number(id)
  );

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const containerRef = useOutsideClick<HTMLDivElement>(closeSelectModal);

  const toggleSelectModal = () => {
    setIsSelectOpen((prev) => !prev);
  };

  const goPrevPage = () => {
    navigate(-1);
  };

  function closeSelectModal() {
    setIsSelectOpen(false);
  }

  const openDeleteAlert = () => {
    setIsDeleteAlertOpen(true);
  };

  const closeDeleteAlert = () => {
    setIsDeleteAlertOpen(false);
  };

  const deleteProductItem = async (id: number): Promise<void> => {
    try {
      const res = await deleteProductMutation(id);
      if (res.code === 200) {
        toast.success("등록한 상품이 삭제되었습니다.");
        navigate(-1);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error(String(error));
    }
    closeDeleteAlert();
  };

  // TODO: 내부에서 loader 띄우기
  if (isLoadingProductItemdetails && !productItemDetails)
    return <div>로딩중</div>;

  return (
    <StyledProductItemPage>
      {isDeleteAlertOpen ? (
        <Alert>
          <AlertBody>
            <DeleteAlertTitle>
              등록한 상품을 정말로 삭제하시겠어요?
            </DeleteAlertTitle>
          </AlertBody>
          <AlertBody>
            <AlertButtonContainer>
              <Button
                style={{ textAlign: "center", padding: 0 }}
                onClick={closeDeleteAlert}
                variant="plain">
                취소
              </Button>
              <Button
                style={{ padding: 0 }}
                onClick={() => {
                  deleteProductItem(Number(id));
                }}
                variant="plain">
                <span>삭제</span>
              </Button>
            </AlertButtonContainer>
          </AlertBody>
        </Alert>
      ) : null}
      <Wrapper>
        <AppBar padding="8px 0" height="56px" isTop={true} isTransparent={true}>
          <ButtonContainer onClick={goPrevPage}>
            <Button style={{ padding: 0 }} variant="plain">
              <img src={chevronLeftIcon} alt="뒤로가기" />
            </Button>
            <span>뒤로</span>
          </ButtonContainer>

          {/* TODO: Dropdown 활용 */}
          {/* PS: 삭제 옵션은 DropdownItem variant="danger" 사용 */}
          <SelectContainer ref={containerRef}>
            <Button
              onClick={toggleSelectModal}
              style={{ padding: 0 }}
              variant="plain">
              <img src={dotsIcon} alt="dots" />
              {isSelectOpen ? (
                <SelectList>
                  <SelectItem
                    onClick={() => {
                      navigate(`/product/${id}/edit`);
                    }}
                    item={{ id: 0, title: "게시글 수정하기" }}>
                    게시글 수정
                  </SelectItem>
                  <SelectItem
                    onClick={openDeleteAlert}
                    item={{ id: 0, title: "삭제" }}>
                    <DeleteText>삭제</DeleteText>
                  </SelectItem>
                </SelectList>
              ) : null}
            </Button>
          </SelectContainer>
        </AppBar>
        <ImageSlider>
          {productItemDetails && productItemDetails.images ? (
            productItemDetails.images.map((image) => (
              <ProductImage
                key={image.id}
                src={image.imageUrl}
                alt="상품 이미지"
              />
            ))
          ) : (
            <ProductImage src={defaultThumbnail} alt="기본 이미지" />
          )}
        </ImageSlider>
        <ProductInfo>
          <SellerInfo>
            <h3>판매자 정보</h3>
            <span>{productItemDetails?.seller.nickname}</span>
            {/* TODO: seller.nickname으로 바꿔야함 */}
          </SellerInfo>
          {/* TODO: Dropdown으로 구현 */}
          <StatusTab>
            <span>{productItemDetails?.status}</span>
            <img src={chevronDownIcon} alt="펼치기" />
          </StatusTab>

          <TextInfoArea>
            <TextInfoHeader>
              <h1>{productItemDetails?.title}</h1>
              <span>
                {productItemDetails?.category.title} ・{" "}
                {convertPastTimestamp(productItemDetails?.updatedAt ?? "")}
              </span>
            </TextInfoHeader>
            <p>{productItemDetails?.content}</p>
            <span>
              채팅 {productItemDetails?.numChat} 관심{" "}
              {productItemDetails?.numLikes} 조회 {productItemDetails?.numViews}
            </span>
          </TextInfoArea>
        </ProductInfo>
      </Wrapper>
      <AppBar padding="16px" height="64px" isTop={false}>
        <Button variant="plain">
          <img src={heartIcon} alt="찜하기" />
        </Button>
        <NumLikesText>
          {formatAsPrice(String(productItemDetails?.numLikes))}
        </NumLikesText>
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            width: "115px",
            height: "32px",
            padding: 0,
            marginLeft: "auto",
          }}
          variant="contained">
          대화 중인 채팅방
        </Button>
      </AppBar>
    </StyledProductItemPage>
  );
}

const StyledProductItemPage = styled.div`
  width: inherit;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const AlertBody = styled.div`
  padding: 24px 32px;
  width: 100%;
  display: flex;
  box-sizing: border-box;
`;

const AlertButtonContainer = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: flex-end;
  gap: 32px;

  > button {
    font: ${({ theme: { font } }) => font.displayDefault16};
    > span {
      color: ${({ theme: { color } }) => color.system.warning};
    }
  }
`;

const Wrapper = styled.div`
  width: inherit;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ButtonContainer = styled.div`
  width: 86px;
  height: 40px;
  padding: 8px;
  display: flex;
  align-items: center;
  flex-grow: 1;
  cursor: pointer;

  > button {
    width: 24px;
    height: 24px;
    > img {
      filter: ${({ theme: { filter } }) => filter.accentText};
    }
  }

  > span {
    width: 46px;
    height: 24px;
    padding: 0 8px;
    font: ${({ theme: { font } }) => font.displayStrong16};
    color: ${({ theme: { color } }) => color.accent.text};
  }
`;

const SelectContainer = styled.div`
  width: 40px;
  height: 40px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  > button {
    > img {
      filter: ${({ theme: { filter } }) => filter.accentText};
    }
  }
`;

const SelectList = styled.ul`
  width: 240px;
  position: absolute;
  top: 48px;
  right: 16px;
  background-color: ${({ theme: { color } }) => color.white};
  border-radius: 12px;
  box-shadow: 0px 4px 4px 0px #00000040;
`;

const DeleteAlertTitle = styled.p`
  color: ${({ theme: { color } }) => color.neutral.textStrong};
  font: ${({ theme: { font } }) => font.displayStrong16};
  height: 24px;
`;

const ProductImage = styled.img`
  width: 393px;
  height: 491px;
  object-fit: cover;
`;

const ImageSlider = styled.div`
  display: flex;
  width: 393px;
  height: 491px;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.24) 0%,
      rgba(0, 0, 0, 0.138832) 9.16%,
      rgba(0, 0, 0, 0) 26.27%
    );
  }
`;

const ProductInfo = styled.div`
  width: 393px;
  padding: 16px 16px 96px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: ${({ theme: { color } }) => color.neutral.background};
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SellerInfo = styled.div`
  width: 361px;
  height: 56px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-radius: 12px;

  background: ${({ theme: { color } }) => color.neutral.backgroundWeak};
  > h3 {
    font: ${({ theme: { font } }) => font.displayDefault16};
    color: ${({ theme: { color } }) => color.neutral.text};
  }

  > span {
    font: ${({ theme: { font } }) => font.displayStrong16};
    color: ${({ theme: { color } }) => color.neutral.textStrong};
  }
`;

const StatusTab = styled.div`
  position: relative;
  margin-top: 14px;
  margin-right: auto;
  display: flex;
  gap: 4px;
  align-items: center;
  width: 108px;
  height: 32px;
  padding: 0 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme: { color } }) => color.neutral.border};

  > span {
    width: 56px;
    height: 16px;
    font: ${({ theme: { font } }) => font.availableDefault12};
    color: ${({ theme: { color } }) => color.neutral.textStrong};
  }

  > img {
    width: 16px;
    height: 16px;
  }
`;

const TextInfoArea = styled.div`
  margin-top: 16px;
  width: 363px;
  height: 304px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  > p {
    font: ${({ theme: { font } }) => font.displayDefault16};
    color: ${({ theme: { color } }) => color.neutral.text};
    width: 100%;
    height: 200px;
  }

  > span {
    width: 100%;
    height: 16px;
    font: ${({ theme: { font } }) => font.displayDefault12};
    color: ${({ theme: { color } }) => color.neutral.textWeak};
  }
`;

const TextInfoHeader = styled.div`
  width: 363px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  > h1 {
    width: 100%;
    height: 32px;
    font: ${({ theme: { font } }) => font.displayStrong20};
    color: ${({ theme: { color } }) => color.neutral.textStrong};
  }

  > span {
    width: 100%;
    height: 16px;
    font: ${({ theme: { font } }) => font.displayDefault12};
    color: ${({ theme: { color } }) => color.neutral.textWeak};
  }
`;

const NumLikesText = styled.span`
  font: ${({ theme: { font } }) => font.displayDefault16};
`;

const DeleteText = styled.span`
  color: ${({ theme: { color } }) => color.system.warning};
`;
