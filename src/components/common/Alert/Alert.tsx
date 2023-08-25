import React from "react";
import { styled } from "styled-components";

type Props = {
  text: string;
  buttons: React.ReactNode[];
};

export default function Alert({ text, buttons }: Props) {
  return (
    <StyledAlert>
      <TextArea>{text}</TextArea>
      <ButtonContainer>
        {buttons.map((button, index) => (
          <React.Fragment key={index}>{button}</React.Fragment>
        ))}
      </ButtonContainer>
    </StyledAlert>
  );
}

const StyledAlert = styled.div`
  display: flex;
  flex-direction: column;
  width: 336px;
  border-radius: 16px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const AlertBody = styled.div`
  display: flex;
  padding: 24px 32px;
  align-items: center;
  gap: 32px;
`;

const TextArea = styled(AlertBody)`
  justify-content: flex-start;
  font: ${({ theme: { font } }) => font.displayStrong16};
  color: ${({ theme: { color } }) => color.neutral.textStrong};
`;

const ButtonContainer = styled(AlertBody)`
  justify-content: flex-end;
`;
