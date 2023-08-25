import { styled } from "styled-components";

export const AlertBody = styled.div`
  display: flex;
  padding: 24px 32px;
  align-items: center;
  gap: 32px;
`;

export const TextArea = styled(AlertBody)`
  justify-content: flex-start;
  font: ${({ theme: { font } }) => font.displayStrong16};
  color: ${({ theme: { color } }) => color.neutral.textStrong};
`;

export const ButtonContainer = styled(AlertBody)`
  justify-content: flex-end;
`;