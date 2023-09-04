import { styled } from "styled-components";
import messageIcon from "@assets/icon/message.svg";
import heartIcon from "@assets/icon/heart.svg";
import { ItemType } from "api/item";

type Props = {
  item: ItemType;
};

export default function Item({ item }: Props) {
  return (
    <StyledItem>
      <ItemImage
        src={
          item.thumbnail ||
          "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800"
        }
      />
      <ItemContentArea>
        <Content>
          <Information>
            <ContentText>{item.title}</ContentText>
            <RegionAndTime>
              {item.region}・{item.updatedAt}
            </RegionAndTime>
            <BadgeAndPrice>
              {item.status && <Badge>{item.status}</Badge>}
              {item.price && <Price>{item.price}원</Price>}
            </BadgeAndPrice>
          </Information>
          <ReactionContainer>
            <div style={{ display: "flex", gap: "4px" }}>
              <ReactionButton>
                <img
                  style={{ width: "16px", height: "16px" }}
                  src={messageIcon}
                  alt="chat"
                />
                <span>{item.numChat}</span>
              </ReactionButton>
              <ReactionButton>
                <img
                  style={{ width: "16px", height: "16px" }}
                  src={heartIcon}
                  alt="heart"
                />
                <span>{item.numLikes}</span>
              </ReactionButton>
            </div>
          </ReactionContainer>
        </Content>
      </ItemContentArea>
    </StyledItem>
  );
}

const ReactionButton = styled.button`
  display: flex;
  width: 23px;
  height: 16px;

  > img {
    filter: ${({ theme: { filter } }) => filter.neutralTextWeak};
    border-radius: 8px;
  }

  > span {
    display: flex;
    align-items: center;
    width: 7px;
    height: 16px;
    padding-bottom: 2px;
    font: ${({ theme: { font } }) => font.displayDefault12};
  }
`;

const Information = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ReactionContainer = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
  font: ${({ theme: { font } }) => font.displayDefault12};
  color: ${({ theme: { color } }) => color.accent.text};
  background: ${({ theme: { color } }) => color.accent.backgroundSecondary};
  border-radius: 8px;
  padding: 10px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 22px;
`;

const Price = styled.div`
  font: ${({ theme: { font } }) => font.displayStrong16};
  color: ${({ theme: { color } }) => color.neutral.textStrong};
`;

const RegionAndTime = styled.div`
  font: ${({ theme: { font } }) => font.displayDefault12};
  color: ${({ theme: { color } }) => color.neutral.textWeak};
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 4px;
`;

const ContentText = styled.div`
  font: ${({ theme: { font } }) => font.displayDefault16};
  color: ${({ theme: { color } }) => color.neutral.text};
`;
const StyledItem = styled.li`
  width: 100%;
  height: 152px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 0;
`;

const ItemImage = styled.img`
  width: 120px;
  height: 120px;
  border: 1px solid ${({ theme: { color } }) => color.neutral.border};
  border-radius: 8px;
`;

const ItemContentArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
