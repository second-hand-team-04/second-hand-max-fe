import xIcon from "@assets/icon/x.svg";
import chevronLeft from "@assets/icon/chevron-left.svg";
import Modal from "@components/common/Modal/Modal";
import {
  ModalBody,
  ModalHeader,
  ModalList,
} from "@components/common/Modal/ModalStyles";
import { useState } from "react";
import { styled } from "styled-components";
import RegionItem from "./RegionItem";
import { useRegionListQuery } from "api/queries/useRegionsQuery";
import { postUserRegion } from "api/region";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "api/queries/queryKeys";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import Button from "@components/common/Button/Button";

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

  const [regionInputValue, setRegionInputValue] = useState<string>("");


  const { data: regionList } = useRegionListQuery();

  console.log(regionList);
  const onRegionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegionInputValue(e.target.value);
  };

  const onRegionItemClick = async (itemId: number) => {
    try {
      const res = await postUserRegion(itemId);

      if (res.code === 201) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.region.userRegions.queryKey,
        });
        setRegionInputValue("");
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
    <Modal onClose={onRegionModalClose}>
      <ModalHeader $isRegionAddModal={isRegionAddModal}>
        <Button
          style={{ padding: "12px", width: "48px", height: "48px" }}
          variant="plain"
          onClick={switchToSelectModal}>
          <img src={chevronLeft} alt="back" />
        </Button>
        <Button
          style={{ padding: "12px", width: "48px", height: "48px" }}
          variant="plain"
          onClick={onRegionModalClose}>
          <img src={xIcon} alt="close" />
        </Button>
      </ModalHeader>
      <ModalBody>
        <SearchBar
          value={regionInputValue}
          onChange={onRegionInputChange}
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
