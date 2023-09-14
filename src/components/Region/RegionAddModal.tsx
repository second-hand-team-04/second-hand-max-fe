import chevronLeft from "@assets/icon/chevron-left.svg";
import xIcon from "@assets/icon/x.svg";
import Button from "@components/common/Button/Button";
import Modal from "@components/common/Modal/Modal";
import {
  ModalBody,
  ModalHeader,
  ModalList,
} from "@components/common/Modal/ModalStyles";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "api/queries/queryKeys";
import useAllRegionsQuery from "api/queries/useAllRegionsQuery";
import { postUserRegion } from "api/region";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { styled } from "styled-components";
import RegionItem from "./RegionItem";

type Props = {
  isRegionAddModal: boolean;
  closeRegionModal: () => void;
  switchToSelectModal: () => void;
};

export default function RegionAddModal({
  isRegionAddModal,
  closeRegionModal,
  switchToSelectModal,
}: Props) {
  const queryClient = useQueryClient();

  const [regionInputValue, setRegionInputValue] = useState<string>("");

  const { data: allRegions } = useAllRegionsQuery();

  const onRegionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegionInputValue(e.target.value);
  };

  const onRegionItemClick = async (itemId: number) => {
    try {
      // TODO: useMutation으로 변경
      console.log(itemId);
      const res = await postUserRegion(itemId);
      console.log(res);

      // if (res.code === 201) {
      queryClient.invalidateQueries({
        queryKey: queryKeys.region.userRegions().queryKey,
      });
      setRegionInputValue("");
      toast.success("나의 동네로 설정되었어요.");
      // }
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
    <Modal onClose={closeRegionModal}>
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
          onClick={closeRegionModal}>
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
          {/* TODO: InfiniteScroll로 변경 */}
          {allRegions &&
            allRegions.regions.length > 0 &&
            allRegions.regions.map((item) => (
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
