import { styled } from "styled-components";

export default function ActionBar({ children }: { children: React.ReactNode }) {
  return <StyledActionBar>{children}</StyledActionBar>;
}

const StyledActionBar = styled.div`
  width: inherit;
  height: 64px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;

  background: ${({ theme: { color } }) => color.neutral.backgroundWeak};
  border-top: ${({ theme: { color } }) => `1px solid ${color.neutral.border}`};
`;
