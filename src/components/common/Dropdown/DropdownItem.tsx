import { MouseEvent, ReactNode } from "react";
import { styled } from "styled-components";

type Props = {
  variant?: string;
  onClick: () => void;
  children: ReactNode;
};

export default function DropdownItem({ variant, onClick, children }: Props) {
  const onClickDropdownItem = (e: MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <StyledDropdownItem $variant={variant} onClick={onClickDropdownItem}>
      {children}
    </StyledDropdownItem>
  );
}

const StyledDropdownItem = styled.li<{ $variant: string | undefined }>`
  padding: 16px;
  font: ${({ theme: { font } }) => font.availableDefault16};
  color: ${({ theme: { color }, $variant }) =>
    `${$variant === "danger" ? color.system.warning : color.neutral.text}`};
  text-align: left;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 0.8px solid var(--neutral-border, rgba(179, 179, 179, 0.39));
  }
`;
