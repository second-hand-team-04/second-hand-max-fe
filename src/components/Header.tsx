import { ReactNode } from "react";
import { styled } from "styled-components";

type Props = {
  children: ReactNode;
};

export default function Header({ children }: Props) {
  return <StyledHeader>{children}</StyledHeader>;
}

const StyledHeader = styled.header`
  width: inherit;
  height: 56px;
  padding: 8px 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: fixed;
  background: ${({ theme: { color } }) => color.neutral.backgroundBlur};
  border-bottom: ${({ theme: { color } }) =>
    `0.8px solid ${color.neutral.border}`};
  backdrop-filter: ${({ theme: { backdropFilter } }) => backdropFilter.blur};
`;
