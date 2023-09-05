import AppBar from "@components/AppBar";
import Button from "@components/common/Button/Button";
import {
  SelectInput,
  SelectItem,
  // SelectItem,
  useSelectInput,
} from "@components/common/SelectInput";
import layoutGridIcon from "@assets/icon/layout-grid.svg";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import NavBar from "@components/NavBar/NavBar";
import useItemQuery from "api/queries/useItemQuery";

// import { RegionType } from "api/region";
// import { Item } from "@components/common/SelectInput/selectInputProps";
import ProductItem from "@components/Home/ProductItem";
import { RegionType } from "api/region";
import { useUserRegionListQuery } from "api/queries/useRegionsQuery";

export default function HomePage() {
  // TODO: user의 동네로 초기화
  const [selectedRegion, onChangeSelectedRegion] = useSelectInput({
    id: 1,
    title: "역삼1동",
  });
  // TODO: 동네 및 카테고리에 따른 상품 목록 fetch
  const { data: productItemList, isLoading: isLoadingItem } = useItemQuery();
  const { data: regionList } = useUserRegionListQuery();

  if (isLoadingItem) return <div>로딩중...</div>;

  return (
    <StyledHomePage>
      <AppBar isTop={true}>
        <div style={{ flexGrow: 1 }}>
          <SelectInput
            name="선택된 동네"
            value={selectedRegion.title}
            onChange={onChangeSelectedRegion}>
            {
              regionList &&
                regionList.map((region: RegionType) => (
                  <SelectItem key={region.id} item={region}>
                    {region.title}
                  </SelectItem>
                ))
              // TODO: SelectItem
            }
          </SelectInput>
        </div>
        <Link to="/categories" style={{ padding: "0 8px" }}>
          <Button variant="plain" size="M">
            <img src={layoutGridIcon} alt="카테고리 보기" />
          </Button>
        </Link>
      </AppBar>
      <ProductItemArea>
        <ProductItemList>
          {productItemList &&
            productItemList.map((product) => (
              <ProductItem key={product.id} item={product} />
            ))}
        </ProductItemList>
      </ProductItemArea>
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

const ProductItemArea = styled.div`
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

const ProductItemList = styled.ul`
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
