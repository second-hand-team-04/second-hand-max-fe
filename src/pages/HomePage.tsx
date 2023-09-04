import AppBar from "@components/AppBar";
import Button from "@components/common/Button/Button";
import {
  SelectInput,
  // SelectItem,
  useSelectInput,
} from "@components/common/SelectInput";
import layoutGridIcon from "@assets/icon/layout-grid.svg";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import NavBar from "@components/NavBar/NavBar";
import Item from "@components/Home/Item";
import useItemQuery from "api/queries/useItemQuery";

export default function HomePage() {
  // TODO: user의 동네로 초기화
  const [selectedRegion, onChangeSelectedRegion] = useSelectInput({
    id: 1,
    value: "역삼1동",
  });
  // TODO: 동네 및 카테고리에 따른 상품 목록 fetch

  const { data: ItemListData, isLoading } = useItemQuery();

  if (isLoading) return <div>로딩중...</div>;

  return (
    <StyledHomePage>
      <AppBar isTop={true}>
        <div style={{ flexGrow: 1 }}>
          <SelectInput
            name="선택된 동네"
            value={selectedRegion.value}
            onChange={onChangeSelectedRegion}>
            {
              // TODO: SelectItem
            }
          </SelectInput>
        </div>
        <Link to="/categories">
          <Button variant="plain" size="M">
            <img src={layoutGridIcon} alt="카테고리 보기" />
          </Button>
        </Link>
      </AppBar>
      <ItemArea>
        {/* <FakeAppBar /> */}
        <ItemList>
          {ItemListData &&
            ItemListData.map((item) => <Item key={item.id} item={item} />)}
        </ItemList>
      </ItemArea>
      <NavBar />
    </StyledHomePage>
  );
}

const StyledHomePage = styled.div`
  position: relative;
  overflow: hidden;
  width: 393px;
  height: 852px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  flex-direction: column;
  padding: 0 16px;
  background: ${({ theme: { color } }) => color.accent.text};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ItemList = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 50px 0 64px 0;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  flex-direction: column;
`;
