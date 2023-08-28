import xIcon from "@assets/icon/x.svg";
import circleXFilled from "@assets/icon/circle-x-filled.svg";
import plus from "@assets/icon/plus.svg";
import {
  IconWrapper,
  ModalHeader,
  ModalTitle,
} from "@components/common/Modal/ModalStyles";
import Modal from "@components/common/Modal/Modal";
import { styled } from "styled-components";
import { ButtonsContainer } from "./RegionModal";
import Button from "@components/common/Button/Button";

type Props = {
  isRegionAddModal: boolean;
  isRegionModalOpen: boolean;
  onRegionModalClose: () => void;
  onRegionAdd: () => void;
  selectedRegionList: string[];
};

export default function RegionSelectModal({
  isRegionAddModal,
  isRegionModalOpen,
  onRegionModalClose,
  onRegionAdd,
  selectedRegionList,
}: Props) {
  const selectedOneRegion = selectedRegionList.length === 1;

  const onRegionDelete = () => {
    if (selectedOneRegion) {
      console.log("동네는 최소 1개이상 선택해야해요.");
      return;
    }
    console.log("동네 삭제");
  };

  return (
    <Modal isOpen={isRegionModalOpen} onClose={onRegionModalClose}>
      <ModalHeader $isRegionAddModal={isRegionAddModal}>
        <ModalTitle>동네 설정</ModalTitle>
        <IconWrapper>
          <img src={xIcon} alt="close" />
        </IconWrapper>
      </ModalHeader>
      <RegionModalContent>
        <ContentNotice>
          {"지역은 최소1개,"}
          <br />
          {"최대 2개까지 설정 가능해요."}
        </ContentNotice>
        <ButtonsContainer>
          {selectedRegionList.map((item, index) => (
            <Button style={{ flexDirection: "row" }} key={index}>
              <RegionButtonText>{item}</RegionButtonText>
              <CircleXFilled
                onClick={onRegionDelete}
                src={circleXFilled}
                alt="close"
              />
            </Button>
          ))}
          <Button
            style={{
              flexDirection: "row",
              justifyContent: "center",
              height: "56px",
            }}
            variant="outlined"
            size="L"
            onClick={onRegionAdd}>
            <img src={plus} alt="plus" />
            <AddButtonText>추가</AddButtonText>
          </Button>
        </ButtonsContainer>
      </RegionModalContent>
    </Modal>
  );
}

const CircleXFilled = styled.img`
  width: 24px;
  height: 24px;
  filter: ${({ theme: { filter } }) => filter.accentText};
`;

export const RegionModalContent = styled.div`
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

const RegionButtonText = styled.div`
  display: flex;
  width: 100%;
  height: 24px;
  font: ${({ theme: { font } }) => font.availableStrong16};
  color: ${({ theme: { color } }) => color.accent.text};
`;

const AddButtonText = styled.div`
  height: 24px;
  font: ${({ theme: { font } }) => font.availableStrong16};
  color: ${({ theme: { color } }) => color.accent.textStrong};
`;
