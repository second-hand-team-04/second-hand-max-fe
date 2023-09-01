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
import useRegionListQuery from "api/queries/useRegionsQuery";

type Props = {
  isRegionAddModal: boolean;
  isRegionModalOpen: boolean;
  onRegionModalClose: () => void;
  switchToSelectModal: () => void;
};

export default function RegionAddModal({
  isRegionAddModal,
  isRegionModalOpen,
  onRegionModalClose,
  switchToSelectModal,
}: Props) {
  const [inputValue, setInputValue] = useState<string>("");

  const { data: regionList } = useRegionListQuery();

  console.log(regionList);
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
      <ModalHeader $isRegionAddModal={isRegionAddModal}>
        <IconWrapper onClick={switchToSelectModal}>
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
          {regionList &&
            regionList.data.map((item) => (
              <RegionItem
                key={item.id}
                item={item}
                onClick={onRegionItemClick}
              />
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