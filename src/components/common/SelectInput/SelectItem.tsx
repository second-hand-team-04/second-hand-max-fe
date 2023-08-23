import { ReactNode } from "react";
import { styled } from "styled-components";
import { Item } from "./selectInputProps";

type Props = {
  isSelected: boolean;
  item: Item;
  children: ReactNode;
};

export default function SelectItem({ isSelected, item, children }: Props) {
  return (
    <StyledSelectItem data-item={JSON.stringify(item)} $isSelected={isSelected}>
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

  &:not(:last-child) {
    border-bottom: 0.8px solid var(--neutral-border, rgba(179, 179, 179, 0.39));
  }
`;
