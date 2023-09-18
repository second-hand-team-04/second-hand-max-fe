import { zAppBar } from "@styles/constants/zIndex";
import { ReactNode } from "react";
import { styled } from "styled-components";

type Props = {
  children: ReactNode;
  height?: string;
  padding?: string;
  isTransparent?: boolean;
  isBlur?: boolean;
  isTop?: boolean;
};

export default function AppBar({
  children,
  height = "56px",
  padding = "8px 0",
  isTransparent = false,
  isTop = true,
  isBlur = false,
}: Props) {
  return (
    <StyledAppBar
      {...{
        $height: height,
        $padding: padding,
        $isTransparent: isTransparent,
        $isTop: isTop,
        $isBlur: isBlur,
      }}>
      {children}
    </StyledAppBar>
  );
}

const StyledAppBar = styled.div<{
  $height: string;
  $padding: string;
  $isTransparent: boolean;
  $isTop: boolean;
  $isBlur: boolean;
}>`
  width: inherit;
  height: ${({ $height }) => $height};
  padding: ${({ $padding }) => $padding};
  display: flex;
  align-items: center;
  position: absolute;
  background: ${({ theme: { color }, $isBlur, $isTransparent }) =>
    `${
      $isTransparent
        ? ""
        : $isBlur
        ? color.neutral.backgroundBlur
        : color.neutral.backgroundWeak
    }`};
  border-bottom: ${({ theme: { color }, $isTransparent }) =>
    `${$isTransparent ? "" : `0.8px solid ${color.neutral.border}`}`};
  backdrop-filter: ${({ theme: { backdropFilter }, $isBlur }) =>
    $isBlur ? backdropFilter.blur : ""};
  top: ${({ $isTop }) => ($isTop ? "0" : "auto")};
  bottom: ${({ $isTop }) => ($isTop ? "auto" : "0")};
  z-index: ${zAppBar};
`;
