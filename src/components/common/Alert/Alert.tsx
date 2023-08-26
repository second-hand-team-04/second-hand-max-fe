import React from "react";
import { styled } from "styled-components";

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
};

export default function Alert({ isOpen, children }: Props) {
  if (!isOpen) return null;

  return <StyledAlert>{children}</StyledAlert>;
}

const StyledAlert = styled.div`
  display: flex;
  flex-direction: column;
  width: 336px;
  border-radius: 16px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
