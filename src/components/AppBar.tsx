import { ReactNode } from "react";
import { styled } from "styled-components";

type Props = {
  children: ReactNode;
};

export default function AppBar({ children }: Props) {
  return <StyledAppBar>{children}</StyledAppBar>;
}

const StyledAppBar = styled.header`
  width: inherit;
  height: 56px;
  padding: 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  background: ${({ theme: { color } }) => color.neutral.backgroundBlur};
  border-bottom: ${({ theme: { color } }) =>
    `0.8px solid ${color.neutral.border}`};
  backdrop-filter: ${({ theme: { backdropFilter } }) => backdropFilter.blur};
`;
