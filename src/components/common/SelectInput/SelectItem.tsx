import { ReactNode } from "react";
import { styled } from "styled-components";
import { Item } from "./selectInputProps";

type Props = {
  isSelected?: boolean;
  item: Item;
  onClick?: () => void;
  children: ReactNode;
};

export default function SelectItem({
  isSelected = false,
  item,
  onClick,
  children,
}: Props) {
  return (
    <StyledSelectItem
      {...{
        "data-item": JSON.stringify(item),
        "$isSelected": isSelected,
        "onClick": onClick,
      }}>
      {children}
    </StyledSelectItem>
  );
}

const StyledSelectItem = styled.li<{ $isSelected: boolean }>`
  padding: 16px;
  font: ${({ theme: { font }, $isSelected }) =>
    $isSelected ? font.enabledStrong16 : font.availableDefault16};
  text-align: left;
  cursor: pointer;
  background: ${({ theme: { color } }) => color.neutral.background};

  &:not(:last-child) {
    border-bottom: 0.8px solid var(--neutral-border, rgba(179, 179, 179, 0.39));
  }

  &:first-child {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }

  &:last-child {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }
`;
