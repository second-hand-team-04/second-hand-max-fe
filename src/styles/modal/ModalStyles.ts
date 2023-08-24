import { styled } from "styled-components";

export const ModalContainer = styled.div`
  width: 320px;
  height: 700px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme: { color } }) => color.neutral.background};
  border-radius: 16px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const ModalHeader = styled.div<{ $isAddMode?: boolean }>`
  width: 100%;
  height: 100%;
  padding: 8px 8px 16px ${(props) => (props.$isAddMode ? "12px" : "24px")};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.div`
  display: flex;
  font: ${({ theme: { font } }) => font.displayStrong20};
  width: 100%;
  height: 32px;
`;

export const IconWrapper = styled.button`
  display: flex;
  width: 48px;
  height: 48px;
  padding: 12px;
  justify-content: center;
  align-items: center;
`;

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

export const ModalListItem = styled.div<{ $isSelected?: boolean }>`
  display: flex;
  padding: 16px 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  color: ${({ theme: { color }, $isSelected }) =>
    $isSelected ? color.neutral.strong : color.neutral.text};
  font: ${({ theme: { font }, $isSelected }) =>
    $isSelected ? font.enabledStrong16 : font.availableDefault16};
  border-bottom: 0.8px solid ${({ theme: { color } }) => color.neutral.border};
  cursor: pointer;
`;
