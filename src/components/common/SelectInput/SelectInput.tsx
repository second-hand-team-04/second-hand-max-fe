import { MouseEvent, ReactNode, useState } from "react";
import chevronUp from "@assets/icon/chevron-up.svg";
import chevronDown from "@assets/icon/chevron-down.svg";
import { styled } from "styled-components";
import { Item } from "./selectInputProps";

type Props = {
  name: string;
  value: string;
  onChange: (newItem: Item) => void;
  children: ReactNode;
};

export default function SelectInput({
  name,
  value,
  onChange,
  children,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const onToggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const onSelectItem = (e: MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLLIElement;
    onChange(JSON.parse(target.dataset.item as string));
    setIsOpen(false);
  };

  return (
    <StyledSelectInput>
      <SelectButton type="button" onClick={onToggleIsOpen}>
        <SelectValue>{value}</SelectValue>
        <img src={isOpen ? chevronUp : chevronDown} alt={name} />
      </SelectButton>

      {isOpen && children && (
        <SelectList onClick={onSelectItem}>{children}</SelectList>
      )}
    </StyledSelectInput>
  );
}

const StyledSelectInput = styled.div`
  padding: 8px;
  position: relative;
`;

const SelectButton = styled.button`
  display: flex;
  align-items: center;
`;

const SelectValue = styled.span`
  padding-inline: 8px;
  font: ${({ theme: { font } }) => font.availableStrong16};
  color: ${({ theme: { color } }) => color.neutral.text};
`;

const SelectList = styled.ul`
  width: 240px;
  position: absolute;
  top: 48px;
  left: 16px;
  background-color: ${({ theme: { color } }) => color.white};
  border-radius: 12px;
  box-shadow: 0px 4px 4px 0px #00000040;
`;
