import dotsIcon from "@assets/icon/dots.svg";
import heartIcon from "@assets/icon/heart.svg";
import messageIcon from "@assets/icon/message.svg";
import { Dropdown, DropdownItem } from "@components/common/Dropdown";
import { formatAsPrice, keepLastRegion } from "@utils/stringFormatters";
import { convertPastTimestamp } from "@utils/time";
import { ProductItemType } from "api/productItem";
import useProductItemStatusEditMutation from "api/queries/useProductItemStatusEditMutation";
import useUserInfoQuery from "api/queries/useUserInfoQuery";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

type Props = {
  item: ProductItemType;
};

export default function ProductItem({ item }: Props) {
  const navigate = useNavigate();
  const productItemRef = useRef(null);

  const { data: userInfo } = useUserInfoQuery();

  const { mutate: statusEditMutate } = useProductItemStatusEditMutation(
    item.id
  );

  const onClickProductItem = () => {
    navigate(`/product/${item.id}`);
  };

  const isUserSeller = userInfo?.userId === item.sellerId;

  const sellerOptions = [
    {
      item: { id: 0, title: "게시글 수정" },
      onClick: () => navigate(`/product/${item.id}/edit`),
    },
    {
      item: { id: 0, title: "판매 중 상태로 전환" },
      onClick: () => statusEditMutate({ status: 1 }),
    },
    {
      item: { id: 0, title: "판매 완료 상태로 전환" },
      onClick: () => statusEditMutate({ status: 2 }),
    },
    {
      variant: "danger",
      item: { id: 0, title: "삭제" },
      // TODO: open confirmation modal
      onClick: () => {},
    },
  ];

  return (
    <StyledProductItem onClick={onClickProductItem} ref={productItemRef}>
      <div>
        <ProductItemThumbnail src={item.thumbnailUrl || defaultThumbnail} />
      </div>
      <ProductItemContent>
        <Information>
          <ContentHeader>
            <span>{item.title}</span>
            {isUserSeller && (
              <Dropdown
                buttonContent={<img src={dotsIcon} />}
                boundaryElementRef={productItemRef}>
                {sellerOptions.map(({ variant, item, onClick }, idx) => (
                  <DropdownItem key={idx} variant={variant} onClick={onClick}>
                    {item.title}
                  </DropdownItem>
                ))}
              </Dropdown>
            )}
          </ContentHeader>
          <RegionAndTime>
            {keepLastRegion(item.region)}・
            {convertPastTimestamp(item.updatedAt)}
          </RegionAndTime>
          <BadgeAndPrice>
            {item.status && <Badge>{item.status}</Badge>}
            <Price>
              {item.price
                ? `${formatAsPrice(String(item.price))}원`
                : "가격미정"}
            </Price>
          </BadgeAndPrice>
        </Information>
        <ReactionContainer>
          <ReactionItem>
            <ReactionImage src={messageIcon} alt="chat" />
            <ReactionDesc>{item.numChat}</ReactionDesc>
          </ReactionItem>
          <ReactionItem>
            <ReactionImage src={heartIcon} alt="heart" />
            <ReactionDesc>{item.numLikes}</ReactionDesc>
          </ReactionItem>
        </ReactionContainer>
      </ProductItemContent>
    </StyledProductItem>
  );
}

const StyledProductItem = styled.li`
  width: inherit;
  height: 152px;
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
`;

const ProductItemThumbnail = styled.img`
  width: 120px;
  height: 120px;
  border: 1px solid ${({ theme: { color } }) => color.neutral.border};
  border-radius: 8px;
  object-fit: cover;
`;

const ProductItemContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 4px;
`;

const Information = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ContentHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  font: ${({ theme: { font } }) => font.displayDefault16};
  color: ${({ theme: { color } }) => color.neutral.text};
`;

const RegionAndTime = styled.div`
  font: ${({ theme: { font } }) => font.displayDefault12};
  color: ${({ theme: { color } }) => color.neutral.textWeak};
`;

const BadgeAndPrice = styled.div`
  width: 226px;
  height: 24px;
  display: flex;
  align-self: center;
  align-items: center;
  gap: 4px;
`;

const Badge = styled.div`
  min-width: 50px;
  height: 100%;
  padding-inline: 8px;
  display: flex;
  align-items: center;
  background: ${({ theme: { color } }) => color.accent.backgroundSecondary};
  border-radius: 8px;
  font: ${({ theme: { font } }) => font.displayDefault12};
  color: ${({ theme: { color } }) => color.accent.text};
  line-height: 100%;
`;

const Price = styled.div`
  font: ${({ theme: { font } }) => font.displayStrong16};
  color: ${({ theme: { color } }) => color.neutral.textStrong};
`;

const ReactionContainer = styled.div`
  width: 100%;
  height: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
  color: ${({ theme: { color } }) => color.neutral.textWeak};
`;

const ReactionItem = styled.div`
  width: 23px;
  height: inherit;
  display: flex;
  align-items: center;
`;

const ReactionImage = styled.img`
  width: 16px;
  height: 16px;
  filter: ${({ theme: { filter } }) => filter.neutralTextWeak};
`;

const ReactionDesc = styled.span`
  width: 7px;
  height: inherit;
  padding-bottom: 2px;
  display: flex;
  align-items: center;
  font: ${({ theme: { font } }) => font.displayDefault12};
`;

// ! FIXME: 임시로 사용중인 이미지
export const defaultThumbnail =
  "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800";
