import chevronLeft from "@assets/icon/chevron-left.svg";
import xIcon from "@assets/icon/x.svg";
import Button from "@components/common/Button/Button";
import InfiniteScrollList from "@components/common/InfiniteScroll/InfiniteScrollList";
import Modal from "@components/common/Modal/Modal";
import { ModalBody, ModalHeader } from "@components/common/Modal/ModalStyles";
import useRegionsInfiniteQuery from "api/region/queries/useRegionsInfiniteQuery";
import useUserRegionPostMutation from "api/region/queries/useUserRegionPostMutation";
import { HTTPSTATUS } from "api/types";
import { Fragment, useState } from "react";
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
  const [regionInputValue, setRegionInputValue] = useState<string>("");

  const {
    data: regions,
    isFetching: isFetchingRegions,
    fetchNextPage: fetchMoreRegions,
  } = useRegionsInfiniteQuery(regionInputValue);
  const { mutateAsync: userRegionPostMutateAsync } =
    useUserRegionPostMutation();

  const onRegionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegionInputValue(e.target.value);
  };

  const onRegionItemClick = async (regionId: number) => {
    const res = await userRegionPostMutateAsync(regionId);
    if (res.code === HTTPSTATUS.created) {
      setRegionInputValue("");
      switchToSelectModal();
    }
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
        <RegionsInfiniteScrollList
          onEndReached={() => !isFetchingRegions && fetchMoreRegions()}>
          {regions &&
            regions.pages.map((group, idx) => (
              <Fragment key={idx}>
                {group.data.regions?.map((region) => (
                  <RegionItem
                    key={region.id}
                    item={region}
                    onClick={onRegionItemClick}
                  />
                ))}
              </Fragment>
            ))}
        </RegionsInfiniteScrollList>
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

const RegionsInfiniteScrollList = styled(InfiniteScrollList)`
  width: 100%;
  height: 100%;
  padding: 0px 24px;
  font: ${({ theme: { font } }) => font.availableDefault16};
  color: ${({ theme: { color } }) => color.neutral.text};
`;
