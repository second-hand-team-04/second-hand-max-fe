import React from "react";
import ReactDOM from "react-dom";
import { styled } from "styled-components";

type Props = {
  // isOpen: boolean;
  children: React.ReactNode;
};

export default function Alert({ children }: Props) {
  // if (!isOpen) return null;

  const alertRoot = document.getElementById("alert-root");

  return ReactDOM.createPortal(
    <StyledAlert>{children}</StyledAlert>,
    alertRoot!
  );
}

const StyledAlert = styled.div`
  display: flex;
  flex-direction: column;
  width: 336px;
  height: 144px;
  border-radius: 16px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme: { color } }) => color.neutral.background};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;
