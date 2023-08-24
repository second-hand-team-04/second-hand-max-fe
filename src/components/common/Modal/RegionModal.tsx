import chevronLeft from "@assets/icon/chevron-left.svg";
import x from "@assets/icon/x.svg";
import circleXFilled from "@assets/icon/circle-x-filled.svg";
import plus from "@assets/icon/plus.svg";
import { styled } from "styled-components";
import Modal from "./Modal";
import { useState } from "react";
import RegionItem from "./RegionItem";
import {
  IconWrapper,
  ModalHeader,
  ModalList,
  ModalTitle,
} from "@styles/modal/ModalStyles";

export default function RegionModal() {
  const [isAddMode, setIsAddMode] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");

  const canPerformAction = list.length !== 1;

  const onRegionDelete = () => {
    if (!canPerformAction) {
      console.log("동네는 최소 1개이상 선택해야해요.");
    }
  };

  const onRegionAdd = () => {
    setIsAddMode(true);
  };

  const onRegionBack = () => {
    setIsAddMode(false);
  };

  const onRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onRegionItemClick = (itemId: number) => {
    setInputValue("");
    console.log("지역 선택", `지역 ID ${itemId}`);
  };

  const regionModalHeader = (
    <ModalHeader $isAddMode={isAddMode}>
      {isAddMode ? (
        <IconWrapper onClick={onRegionBack}>
          <img src={chevronLeft} alt="back" />
        </IconWrapper>
      ) : (
        <ModalTitle>동네 설정</ModalTitle>
      )}
      <IconWrapper>
        <img src={x} alt="close" />
      </IconWrapper>
    </ModalHeader>
  );

  const regionModalBody = (
    <RegionModalContent>
      <ContentNotice>
        {"지역은 최소1개,"}
        <br />
        {"최대 2개까지 설정 가능해요."}
      </ContentNotice>
      <ButtonsContainer>
        {list.map((item, index) => (
          <ContentRegionButton key={index}>
            <RegionButtonText>{item}</RegionButtonText>
            <img onClick={onRegionDelete} src={circleXFilled} alt="close" />
          </ContentRegionButton>
        ))}
        {canPerformAction ? null : (
          <>
            <ContentAddButton onClick={onRegionAdd}>
              <img onClick={onRegionDelete} src={plus} alt="plus" />
              <div>추가</div>
            </ContentAddButton>
          </>
        )}
      </ButtonsContainer>
    </RegionModalContent>
  );

  const regionSelectBody = (
    <>
      <SearchBar
        value={inputValue}
        onChange={onRegionChange}
        placeholder="동명(읍, 면)으로 검색(ex. 서초동)"
      />
      <ModalList>
        {regionList.map((item) => (
          <RegionItem key={item.id} item={item} onClick={onRegionItemClick} />
        ))}
      </ModalList>
    </>
  );

  return (
    <Modal
      header={regionModalHeader}
      body={isAddMode ? regionSelectBody : regionModalBody}
    />
  );
}

const SearchBar = styled.input`
  display: flex;
  width: 288px;
  height: 40px;
  padding: 8px;
  flex-direction: column;
  align-items: flex-start;
  text-align: start;
  gap: 4px;
  box-sizing: border-box;
  border-radius: 8px;

  font: ${({ theme: { font } }) => font.availableDefault16};
  color: ${({ theme: { color } }) => color.neutral.text};
  background: ${({ theme: { color } }) => color.neutral.backgroundBold};
`;

const RegionModalContent = styled.div`
  display: flex;
  width: 100%;
  padding: 40px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
`;

const ContentNotice = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 32px;
  text-align: center;
  font: ${({ theme: { font } }) => font.displayDefault12};
  color: ${({ theme: { color } }) => color.neutral.text};
`;

// TODO 버튼 컴포넌트 분리 ------------------------------

const commonButtonStyles = `
  display: flex;
  width: 100%;
  height: 56px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
`;

const ContentRegionButton = styled.button`
  ${commonButtonStyles}
  padding: 16px;
  background-color: ${({ theme: { color } }) => color.accent.backgroundPrimary};
`;

const RegionButtonText = styled.div`
  display: flex;
  width: 100%;
  height: 24px;
  font: ${({ theme: { font } }) => font.availableStrong16};
  color: ${({ theme: { color } }) => color.accent.text};
`;

const ContentAddButton = styled.button`
  ${commonButtonStyles}
  background-color: ${({ theme: { color } }) => color.accent.text};
  color: ${({ theme: { color } }) => color.accent.textWeak};
  font: ${({ theme: { font } }) => font.availableStrong16};
  border: 0.8px solid ${({ theme: { color } }) => color.neutral.border};
`;
// TODO ------------------------------

// const list = ["역삼1동", "역삼2동"];
const list = ["역삼1동"];

const regionList = [
  { id: 1, title: "서울 강남구 개포1동" },
  { id: 2, title: "서울 강남구 개포2동" },
  { id: 3, title: "서울 강남구 개포3동" },
  { id: 4, title: "서울 강남구 개포1동" },
  { id: 5, title: "서울 강남구 개포2동" },
  { id: 6, title: "서울 강남구 개포3동" },
  { id: 7, title: "서울 강남구 개포1동" },
  { id: 8, title: "서울 강남구 개포2동" },
  { id: 9, title: "서울 강남구 개포3동" },
  { id: 10, title: "서울 강남구 개포1동" },
  { id: 11, title: "서울 강남구 개포2동" },
  { id: 12, title: "서울 강남구 개포3동" },
  { id: 13, title: "서울 강남구 개포1동" },
  { id: 14, title: "서울 강남구 개포2동" },
  { id: 15, title: "서울 강남구 개포3동" },
];
