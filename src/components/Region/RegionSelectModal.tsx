import circleXFilled from "@assets/icon/circle-x-filled.svg";
import plus from "@assets/icon/plus.svg";
import xIcon from "@assets/icon/x.svg";
import Button from "@components/common/Button/Button";
import Modal from "@components/common/Modal/Modal";
import { ModalHeader, ModalTitle } from "@components/common/Modal/ModalStyles";
import { ProductItemsFiltersContext } from "@context/ProductItemsFiltersContext";
import { useQueryClient } from "@tanstack/react-query";
import { keepLastRegion } from "@utils/stringFormatters";
import queryKeys from "api/queries/queryKeys";
import { RegionType, deleteUserRegion } from "api/region";
import { AxiosError } from "axios";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { styled } from "styled-components";
import { ButtonsContainer } from "./RegionModal";

type Props = {
  userRegionList: RegionType[];
  isRegionAddModal: boolean;
  closeRegionModal: () => void;
  onOpenRegionSelectModal: () => void;
};

export default function RegionSelectModal({
  userRegionList,
  isRegionAddModal,
  closeRegionModal,
  onOpenRegionSelectModal,
}: Props) {
  const queryClient = useQueryClient();

  const { selectedRegion, onChangeSelectedRegion } = useContext(
    ProductItemsFiltersContext
  );

  const selectedOneRegion = userRegionList.length === 1;

  // TODO : useMutation으로 변경
  const onRegionDelete = async (
    itemId: number,
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (selectedOneRegion) {
      toast.error("동네는 최소 1개이상 선택해야해요.");
      return;
    }

    try {
      const res = await deleteUserRegion(itemId);

      if (res.code === 200) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.region.userRegions().queryKey,
        });
        toast.success("선택한 동네가 삭제되었어요.");
      } else {
        throw Error("동네 삭제에 실패했어요.");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error(String(error));
    }
  };

  const onRegionSelect = async (region: RegionType) => {
    onChangeSelectedRegion(region);
  };

  return (
    <Modal onClose={closeRegionModal}>
      <ModalHeader $isRegionAddModal={isRegionAddModal}>
        <ModalTitle>동네 설정</ModalTitle>
        <Button
          style={{ padding: "12px", width: "48px", height: "48px" }}
          variant="plain"
          onClick={closeRegionModal}>
          <img src={xIcon} alt="close" />
        </Button>
      </ModalHeader>
      <RegionModalContent>
        <ContentNotice>
          {"지역은 최소1개,"}
          <br />
          {"최대 2개까지 설정 가능해요."}
        </ContentNotice>
        <ButtonsContainer>
          {userRegionList.map((item, index) => (
            <Button
              style={{
                flexDirection: "row",
                opacity:
                  !selectedRegion.id || selectedRegion.id === item.id ? 1 : 0.3,
              }}
              key={index}
              onClick={() => onRegionSelect(item)}>
              <RegionButtonText>{keepLastRegion(item.title)}</RegionButtonText>
              <CircleXFilled
                onClick={(e) => onRegionDelete(item.id, e)}
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
            onClick={onOpenRegionSelectModal}>
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
