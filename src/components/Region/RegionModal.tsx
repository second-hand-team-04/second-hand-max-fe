import { ProductItemsFiltersContext } from "@context/ProductItemsFiltersContext";
import { RegionType } from "api/region";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { styled } from "styled-components";
import RegionAddModal from "./RegionAddModal";
import RegionSelectModal from "./RegionSelectModal";

type Props = {
  userRegionList: RegionType[];
  closeRegionModal: () => void;
};

export default function RegionModal({
  userRegionList,
  closeRegionModal,
}: Props) {
  const [isRegionAddModal, setIsRegionAddModal] = useState(false);

  const { onChangeSelectedRegion } = useContext(ProductItemsFiltersContext);

  const onOpenRegionSelectModal = () => {
    if (userRegionList.length === 2) {
      toast.error("동네는 최대 2개까지 설정 가능해요.");
      return;
    }
    setIsRegionAddModal(true);
  };

  const switchToSelectModal = () => {
    setIsRegionAddModal(false);
  };

  return isRegionAddModal ? (
    <RegionAddModal
      {...{
        isRegionAddModal,
        closeRegionModal,
        switchToSelectModal,
      }}
    />
  ) : (
    <RegionSelectModal
      {...{
        userRegionList,
        isRegionAddModal,
        closeRegionModal,
        onChangeSelectedRegion,
        onOpenRegionSelectModal,
      }}
    />
  );
}

export const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
`;
