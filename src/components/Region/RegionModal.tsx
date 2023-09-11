import { styled } from "styled-components";
import { useState } from "react";
import RegionSelectModal from "./RegionSelectModal";
import RegionAddModal from "./RegionAddModal";
import { RegionType } from "api/region";
import { toast } from "react-hot-toast";

type Props = {
  onRegionModalClose: () => void;
  selectedRegionList: RegionType[];
  selectMyRegion: (region: RegionType) => void;
  selectedRegion: RegionType | null;
};

export default function RegionModal({
  onRegionModalClose,
  selectedRegionList,
  selectMyRegion,
  selectedRegion,
}: Props) {
  const [isRegionAddModal, setIsRegionAddModal] = useState(false);

  const onOpenRegionSelectModal = () => {
    if (selectedRegionList.length === 2) {
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
        onRegionModalClose,
        switchToSelectModal,
      }}
    />
  ) : (
    <RegionSelectModal
      {...{
        isRegionAddModal,
        selectMyRegion,
        onRegionModalClose,
        onOpenRegionSelectModal,
        selectedRegionList,
        selectedRegion,
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
