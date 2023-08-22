import { styled } from "styled-components";
import { IconWrapper, ModalContainer } from "./RegionModal";
import { useEffect, useState } from "react";

const list = [
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

type RegionItem = {
  id: number;
  title: string;
};

export function RegionSelectModal() {
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);

  const onSearchBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const onRegionItemClick = (itemId: number) => {
    setInputValue("");
    console.log("지역 선택", `지역 ID ${itemId}`);
  };

  return (
    <ModalContainer>
      <SelectModalHeader>
        <IconWrapper>
          {/* // TODO: 버튼 아이콘으로 리팩토링 필요 */}
          <img src="src/assets/icon/chevron-left.svg" alt="close" />
        </IconWrapper>
        <IconWrapper>
          {/* // TODO: 버튼 아이콘으로 리팩토링 필요 */}
          <img src="src/assets/icon/x.svg" alt="close" />
        </IconWrapper>
      </SelectModalHeader>
      <SearchBar
        value={inputValue}
        onChange={onSearchBarChange}
        placeholder="동명(읍, 면)으로 검색(ex. 서초동)"
      />
      <ModalList>
        {list.map((item) => (
          <RegionItem key={item.id} item={item} onClick={onRegionItemClick} />
        ))}
      </ModalList>
    </ModalContainer>
  );
}

function RegionItem({
  item,
  onClick,
}: {
  item: RegionItem;
  onClick: (itemId: number) => void;
}) {
  return (
    <ModalListItem onClick={() => onClick(item.id)} key={item.id}>
      {item.title}
    </ModalListItem>
  );
}

// TODO: 나머지 두 모달 컴포넌트의 헤더와 패딩만 차이나는데 이것도 공통화할까요?
const SelectModalHeader = styled.div`
  width: 100%;
  height: 72px;
  padding: 8px 8px 16px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

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

// TODO: export 해놓은 스타일 컴포넌트들 공통 모달 스타일로 묶어줘야함
export const ModalList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0px 24px;
  box-sizing: border-box;
  overflow-y: scroll;

  font: ${({ theme: { font } }) => font.availableDefault16};
  color: ${({ theme: { color } }) => color.neutral.text};

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ModalListItem = styled.div`
  display: flex;
  padding: 16px 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  border-bottom: 0.8px solid ${({ theme: { color } }) => color.neutral.border};
  cursor: pointer;
`;
// TODO ------------------------------
