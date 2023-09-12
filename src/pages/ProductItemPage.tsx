import chevronDownIcon from "@assets/icon/chevron-down.svg";
import chevronLeftIcon from "@assets/icon/chevron-left.svg";
import dotsIcon from "@assets/icon/dots.svg";
import heartIcon from "@assets/icon/heart.svg";
import AppBar from "@components/AppBar";

import { defaultThumbnail } from "@components/Product/ProductItem";
import Button from "@components/common/Button/Button";
import { SelectItem } from "@components/common/SelectInput";
import useOutsideClick from "@hooks/useOutsideClick";
import { formatAsPrice } from "@utils/stringFormatters";
import { useProductItemDetailsQuery } from "api/queries/useProductItemDetailsQuery";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";

export default function ProductItemPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const { data: productItemDetails, isLoading } = useProductItemDetailsQuery(
    Number(id)
  );
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

  if (isLoading && !productItemDetails) return <div>로딩중</div>;

  return (
    <StyledProductItemPage>
      <ProductItemHeader>
        <ButtonContainer onClick={goPrevPage}>
          <Button style={{ padding: 0 }} variant="plain">
            <img src={chevronLeftIcon} alt="뒤로가기" />
          </Button>
          <span>뒤로</span>
        </ButtonContainer>
        <SelectContainer ref={containerRef}>
          <Button onClick={toggleSelectModal} variant="plain">
            <img style={{ position: "absolute" }} src={dotsIcon} alt="dots" />
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
                  onClick={() => {
                    console.log("셀렉아이템");
                  }}
                  item={{ id: 0, title: "삭제" }}>
                  <DeleteText>삭제</DeleteText>
                </SelectItem>
              </SelectList>
            ) : null}
          </Button>
        </SelectContainer>
      </ProductItemHeader>
      <ImageSlider>
        {productItemDetails && productItemDetails.images.length > 0 ? (
          productItemDetails.images.map((image) => (
            <ProductImage key={image.id} src={image.url} alt="상품 이미지" />
          ))
        ) : (
          <ProductImage src={defaultThumbnail} alt="기본 이미지" />
        )}
      </ImageSlider>
      <ProductInfo>
        <SellerInfo>
          <h3>판매자 정보</h3>
          <span>{productItemDetails?.seller.nickname}</span>
        </SellerInfo>
        <StatusTab>
          <span>{productItemDetails?.status}</span>
          <img src={chevronDownIcon} alt="펼치기" />
        </StatusTab>
        <TextInfoArea>
          <TextInfoHeader>
            <h1>{productItemDetails?.title}</h1>
            <span>
              {productItemDetails?.category} ・ {productItemDetails?.updatedAt}
            </span>
          </TextInfoHeader>
          <p>{productItemDetails?.content}</p>
          <span>
            채팅 {productItemDetails?.numChat} 관심{" "}
            {productItemDetails?.numLikes} 조회 {productItemDetails?.numViews}
          </span>
        </TextInfoArea>
        <AppBar padding="16px" height="64px" isTop={false}>
          <Button variant="plain">
            <img src={heartIcon} alt="찜하기" />
          </Button>
          <span>{formatAsPrice(String(productItemDetails?.price))}</span>
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
      </ProductInfo>
    </StyledProductItemPage>
  );
}

const ProductImage = styled.img`
  width: 393px;
  height: 491px;
  object-fit: cover;
`;

const DeleteText = styled.span`
  color: ${({ theme: { color } }) => color.system.warning};
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

const StyledProductItemPage = styled.div`
  width: 393px;
  height: 1025px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const ButtonContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 86px;
  height: 40px;
  padding: 8px;

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

const ProductItemHeader = styled.div`
  width: 393px;
  height: 56px;
  display: flex;
  justify-content: space-between;
  position: absolute;

  > button {
    width: 40px;
    height: 40px;

    > img {
      filter: ${({ theme: { filter } }) => filter.accentText};
    }
  }
`;

const ImageSlider = styled.div`
  display: flex;
  width: 393px;
  height: 491px;
`;

const ProductInfo = styled.div`
  position: relative;
  width: 393px;
  height: 534px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 16px 0 16px;
  background: ${({ theme: { color } }) => color.neutral.background};
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

const SelectList = styled.ul`
  width: 240px;
  position: absolute;
  top: 48px;
  right: 16px;
  background-color: ${({ theme: { color } }) => color.white};
  border-radius: 12px;
  box-shadow: 0px 4px 4px 0px #00000040;
`;

const SelectContainer = styled.div`
  > button {
    > img {
      filter: ${({ theme: { filter } }) => filter.accentText};
    }
  }
`;
