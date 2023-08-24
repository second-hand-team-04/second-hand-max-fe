import { styled } from "styled-components";
import { useState } from "react";
import RegionModalMain from "./RegionModalMain";
import RegionModalAdd from "./RegionModalAdd";

export default function RegionModal() {
  const [isAddMode, setIsAddMode] = useState(false);
  const isRegionModalOpen = true; // context로 관리?

  const onRegionAdd = () => {
    if (selectedRegionList.length === 2) {
      console.log("동네는 최대 2개까지 설정 가능해요.");
      return;
    }
    setIsAddMode(true);
  };

  const onRegionBack = () => {
    setIsAddMode(false);
  };

  const onRegionModalClose = () => {
    //모달 밖(backdrop)을 클릭시 닫기 위한 함수
  };

  return isAddMode ? (
    <RegionModalAdd
      {...{
        isAddMode,
        isRegionModalOpen,
        onRegionModalClose,
        onRegionBack,
      }}
    />
  ) : (
    <RegionModalMain
      {...{
        isAddMode,
        isRegionModalOpen,
        onRegionModalClose,
        onRegionAdd,
        selectedRegionList,
      }}
    />
  );
}
// TODO 버튼 컴포넌트 분리 ------------------------------

export const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
`;

// TODO ------------------------------

// const selectedRegionList = ["역삼1동", "역삼2동"];
const selectedRegionList = ["역삼1동"];
