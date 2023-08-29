import { styled } from "styled-components";
import { useState } from "react";
import RegionSelectModal from "./RegionSelectModal";
import RegionAddModal from "./RegionAddModal";

export default function RegionModal() {
  const [isRegionAddModal, setIsRegionAddModal] = useState(false);
  const isRegionModalOpen = true;

  const onRegionAdd = () => {
    if (selectedRegionList.length === 2) {
      console.log("동네는 최대 2개까지 설정 가능해요.");
      return;
    }
    setIsRegionAddModal(true);
  };

  const switchToSelectModal = () => {
    setIsRegionAddModal(false);
  };

  const onRegionModalClose = () => {
    //모달 밖(backdrop)을 클릭시 닫기 위한 함수
  };

  return isRegionAddModal ? (
    <RegionAddModal
      {...{
        isRegionAddModal,
        isRegionModalOpen,
        onRegionModalClose,
        switchToSelectModal,
      }}
    />
  ) : (
    <RegionSelectModal
      {...{
        isRegionAddModal,
        isRegionModalOpen,
        onRegionModalClose,
        onRegionAdd,
        selectedRegionList,
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

// const selectedRegionList = ["역삼1동", "역삼2동"];
const selectedRegionList = ["역삼1동"];
