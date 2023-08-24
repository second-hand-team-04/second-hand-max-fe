import xIcon from "@assets/icon/x.svg";
import chevronLeft from "@assets/icon/chevron-left.svg";
import Modal from "@components/common/Modal/Modal";
import {
  IconWrapper,
  ModalBody,
  ModalHeader,
  ModalList,
} from "@components/common/Modal/ModalStyles";
import { useState } from "react";
import { styled } from "styled-components";
import RegionItem from "./RegionItem";

type Props = {
  isAddMode: boolean;
  isRegionModalOpen: boolean;
  onRegionModalClose: () => void;
  onRegionBack: () => void;
};

export default function RegionModalAdd({
  isAddMode,
  isRegionModalOpen,
  onRegionModalClose,
  onRegionBack,
}: Props) {
  const [inputValue, setInputValue] = useState<string>("");

  const onRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("검색중인 지역", e.target.value);
    setInputValue(e.target.value);
  };

  const onRegionItemClick = (itemId: number) => {
    setInputValue("");
    console.log("지역 선택", `지역 ID ${itemId}`);
  };

  return (
    <Modal isOpen={isRegionModalOpen} onClose={onRegionModalClose}>
      <ModalHeader $isAddMode={isAddMode}>
        <IconWrapper onClick={onRegionBack}>
          <img src={chevronLeft} alt="back" />
        </IconWrapper>
        <IconWrapper>
          <img src={xIcon} alt="close" />
        </IconWrapper>
      </ModalHeader>
      <ModalBody>
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
      </ModalBody>
    </Modal>
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
