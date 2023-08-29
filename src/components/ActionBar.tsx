import { styled } from "styled-components";

export default function ActionBar({ children }: { children: React.ReactNode }) {
  return <StyledActionBar>{children}</StyledActionBar>;
}

const StyledActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 393px;
  height: 64px;
  padding: 16px;

  background: ${({ theme: { color } }) => color.neutral.backgroundWeak};
  border-top: ${({ theme: { color } }) => `1px solid ${color.neutral.border}`};
`;
