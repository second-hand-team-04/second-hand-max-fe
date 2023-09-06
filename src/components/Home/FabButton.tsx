import { styled } from "styled-components";
import plusIcon from "@assets/icon/plus.svg";

export function FabButton({ onClick }: { onClick: () => void }) {
  return (
    <StyledFabButton onClick={onClick}>
      <img src={plusIcon} alt="plus" />
    </StyledFabButton>
  );
}

const StyledFabButton = styled.button`
  position: absolute;
  bottom: 88px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  padding: 18px;
  background: ${({ theme: { color } }) => color.accent.backgroundPrimary};

  > img {
    width: 18px;
    height: 20px;
    filter: ${({ theme: { filter } }) => filter.accentText};
  }
`;
