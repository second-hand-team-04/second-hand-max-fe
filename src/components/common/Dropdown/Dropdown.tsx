import useIntersection from "@hooks/useIntersection";
import { zDropdown } from "@styles/constants/zIndex";
import { MouseEvent, ReactNode, RefObject, useRef, useState } from "react";
import { styled } from "styled-components";

type Props = {
  buttonContent: ReactNode;
  boundaryElementRef?: RefObject<Element>;
  children: ReactNode;
};

export default function Dropdown({
  buttonContent,
  boundaryElementRef,
  children,
}: Props) {
  const dropdownRef = useRef<HTMLUListElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const intersectingSide = useIntersection(dropdownRef, boundaryElementRef);

  const onToggleIsOpen = (e: MouseEvent) => {
    e.stopPropagation();
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
  position: relative;
  display: inline-block;
  position: relative;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
`;

const DropdownList = styled.ul<{ $intersectingSide: "left" | "right" | null }>`
  width: 240px;
  position: absolute;
  top: 48px;
  left: ${({ $intersectingSide }) =>
    $intersectingSide === "left" || $intersectingSide === null ? "0" : "auto"};
  right: ${({ $intersectingSide }) => $intersectingSide === "right" && "0"};
  background-color: ${({ theme: { color } }) => color.neutral.background};
  border-radius: 12px;
  box-shadow: 0px 4px 4px 0px #00000040;
  z-index: ${zDropdown};
`;
