import { ReactNode } from "react";
import { styled } from "styled-components";

type Props = {
  onClick: () => void;
  children: ReactNode;
};

export default function DropdownItem({ onClick, children }: Props) {
  return <StyledDropdownItem onClick={onClick}>{children}</StyledDropdownItem>;
}

const StyledDropdownItem = styled.li`
  padding: 16px;
  font: ${({ theme: { font } }) => font.availableDefault16};
  text-align: left;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 0.8px solid var(--neutral-border, rgba(179, 179, 179, 0.39));
  }
`;
