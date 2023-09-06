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
import { useRegionListQuery } from "api/queries/useRegionsQuery";
import { addUserRegion } from "api/region";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "api/queries/queryKeys";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

type Props = {
  isRegionAddModal: boolean;

  onRegionModalClose: () => void;
  switchToSelectModal: () => void;
};

export default function RegionAddModal({
  isRegionAddModal,

  onRegionModalClose,
  switchToSelectModal,
}: Props) {
  const queryClient = useQueryClient();

  const [inputValue, setInputValue] = useState<string>("");

  const { data: regionList } = useRegionListQuery();

  const onRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("검색중인 지역", e.target.value);
    setInputValue(e.target.value);
  };

  const onRegionItemClick = async (itemId: number) => {
    setInputValue("");
    console.log("지역 선택", `지역 ID ${itemId}`);

    try {
      const res = await addUserRegion(itemId);
      console.log(res);
      if (res.code === 201) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.region.userRegions.queryKey,
        });
        toast.success("나의 동네로 설정되었어요.");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error(String(error));
    }

    switchToSelectModal();
  };

  return (
    <Modal onClose={() => {}}>
      <ModalHeader $isRegionAddModal={isRegionAddModal}>
        <IconWrapper onClick={switchToSelectModal}>
          <img src={chevronLeft} alt="back" />
        </IconWrapper>
        <IconWrapper onClick={onRegionModalClose}>
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
            regionList.regions.length > 0 &&
            regionList.regions.map((item) => (
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
