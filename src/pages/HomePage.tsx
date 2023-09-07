import AppBar from "@components/AppBar";
import Button from "@components/common/Button/Button";
import {
  SelectInput,
  SelectItem,
  useSelectInput,
} from "@components/common/SelectInput";
import layoutGridIcon from "@assets/icon/layout-grid.svg";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import NavBar from "@components/NavBar/NavBar";
import useItemQuery from "api/queries/useProductItemsQuery";
import ProductItem from "@components/Home/ProductItem";
import { RegionType } from "api/region";
import { useUserRegionListQuery } from "api/queries/useRegionsQuery";
import RegionModal from "@components/Region/RegionModal";
import { useEffect, useRef, useState } from "react";
import { FabButton } from "@components/Home/FabButton";
import { keepLastRegion } from "@utils/stringFormatters";

export default function HomePage() {
  const navigate = useNavigate();

  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [selectedRegion, onChangeSelectedRegion] = useSelectInput({
    id: 1,
    title: "역삼1동",
  });

  const { data: productItems, isLoading: isLoadingProductItems } =
    useItemQuery();
  const { data: regionList } = useUserRegionListQuery();

  const previousRegionListLength = useRef<number>(0);

  useEffect(() => {
    if (!regionList || regionList.length === 0) return;

    if (regionList.length !== previousRegionListLength.current) {
      onChangeSelectedRegion(regionList[0]);
    }
    previousRegionListLength.current = regionList.length;
  }, [regionList, onChangeSelectedRegion, selectedRegion.title]);

  const onSelectMyRegionButtonClick = () => {
    setIsRegionModalOpen(true);
  };

  const selectMyRegion = (region: RegionType) => {
    onChangeSelectedRegion(region);
  };

  const closeRegionModal = () => {
    setIsRegionModalOpen(false);
  };

  const postNewProduct = () => {
    navigate("/product/new");
  };

  if (isLoadingProductItems) return <div>로딩중...</div>;

  return (
    <StyledHomePage>
      {isRegionModalOpen && regionList ? (
        <RegionModal
          selectedRegion={selectedRegion}
          selectMyRegion={selectMyRegion}
          selectedRegionList={regionList}
          onRegionModalClose={closeRegionModal}
        />
      ) : null}
      <AppBar isTop={true}>
        <div style={{ flexGrow: 1 }}>
          <SelectInput
            name="선택된 동네"
            value={keepLastRegion(selectedRegion.title)}
            onChange={onChangeSelectedRegion}>
            {regionList &&
              regionList.length > 0 &&
              regionList.map((region: RegionType) => (
                <SelectItem key={region.id} item={region}>
                  {keepLastRegion(region.title)}
                </SelectItem>
              ))}
            <SelectItem
              onClick={onSelectMyRegionButtonClick}
              item={{ id: 0, title: "내 동네 설정하기" }}>
              내 동네 설정하기
            </SelectItem>
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
          {productItems &&
            productItems.length > 0 &&
            productItems.map((product) => (
              <ProductItem key={product.id} item={product} />
            ))}
        </ProductItemList>
      </ProductItemArea>
      <NavBar />
      <FabButton onClick={postNewProduct} />
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
