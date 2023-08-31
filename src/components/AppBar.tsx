import { ReactNode } from "react";
import { styled } from "styled-components";

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
  isTop = true,
}: Props) {
  return (
    <StyledAppBar
      {...{
        $height: height,
        $padding: padding,
        $isTop: isTop,
      }}>
      {children}
    </StyledAppBar>
  );
}

const StyledAppBar = styled.header<{
  $height: string;
  $padding: string;
  $isTop: boolean;
}>`
  width: inherit;
  height: ${({ $height }) => $height};
  padding: ${({ $padding }) => $padding};
  display: flex;
  align-items: center;
  position: absolute;
  background: ${({ theme: { color }, $isTop }) =>
    $isTop ? color.neutral.backgroundBlur : color.neutral.backgroundWeak};
  border-bottom: ${({ theme: { color } }) =>
    `0.8px solid ${color.neutral.border}`};
  backdrop-filter: ${({ theme: { backdropFilter }, $isTop }) =>
    $isTop ? backdropFilter.blur : ""};
  top: ${({ $isTop }) => ($isTop ? "0" : "auto")};
  bottom: ${({ $isTop }) => ($isTop ? "auto" : "0")};
`;
