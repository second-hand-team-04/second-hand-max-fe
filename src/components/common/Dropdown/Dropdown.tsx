import { ReactNode, useRef, useState } from "react";
import { styled } from "styled-components";
import useViewportIntersection from "../../../hooks/useViewportIntersection";

type Props = {
  buttonContent: ReactNode;
  children: ReactNode;
};

export default function Dropdown({ buttonContent, children }: Props) {
  const dropdownRef = useRef<HTMLUListElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const intersectingSide = useViewportIntersection(dropdownRef);

  const onToggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <StyledDropdown>
      <DropdownButton {...{ type: "button", onClick: onToggleIsOpen }}>
        {buttonContent}
      </DropdownButton>

      {isOpen && children && (
        <DropdownList
          {...{
            ref: dropdownRef,
            $intersectingSide: intersectingSide,
            onClick: () => setIsOpen(false),
          }}>
          {children}
        </DropdownList>
      )}
    </StyledDropdown>
  );
}

const StyledDropdown = styled.div`
  display: inline-block;
  position: relative;
  transform: translateX(880px);
`;

const DropdownButton = styled.button`
  padding: 8px;
  display: flex;
  align-items: center;
`;

const DropdownList = styled.ul<{ $intersectingSide: "left" | "right" | null }>`
  width: 240px;
  position: absolute;
  top: 48px;
  left: ${({ $intersectingSide }) =>
    $intersectingSide === "left" || $intersectingSide === null
      ? "16px"
      : "auto"};
  right: ${({ $intersectingSide }) => $intersectingSide === "right" && "16px"};
  background-color: ${({ theme: { color } }) => color.white};
  border-radius: 12px;
  box-shadow: 0px 4px 4px 0px #00000040;
`;
