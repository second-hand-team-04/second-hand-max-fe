import { ReactNode } from "react";
import { styled } from "styled-components";

type AppBarProps = {
  $height: string;
  $padding: string;
  $justifyContent: string;
  $isTop?: boolean;
};

type Props = {
  children: ReactNode;
  height?: string;
  padding?: string;
  justifyContent?: string;
  isTop?: boolean;
};

export default function AppBar({
  children,
  height = "56px",
  padding = "8px 0",
  justifyContent = "space-between",
  isTop = true,
}: Props) {
  return (
    <StyledAppBar
      {...{
        $height: height,
        $padding: padding,
        $justifyContent: justifyContent,
        $isTop: isTop,
      }}>
      {children}
    </StyledAppBar>
  );
}

const StyledAppBar = styled.header<AppBarProps>`
  width: inherit;
  height: ${({ $height }) => $height};
  padding: ${({ $padding }) => $padding};
  display: flex;
  justify-content: ${({ $justifyContent }) => $justifyContent};
  align-items: center;
  // position: fixed;
  background: ${({ theme: { color } }) => color.neutral.backgroundBlur};
  border-bottom: ${({ theme: { color } }) =>
    `0.8px solid ${color.neutral.border}`};
  backdrop-filter: ${({ theme: { backdropFilter }, $isTop }) =>
    $isTop ? backdropFilter.blur : ""};
`;
