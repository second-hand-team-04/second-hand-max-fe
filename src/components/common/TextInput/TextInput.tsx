import { ChangeEvent, InputHTMLAttributes } from "react";
import { styled } from "styled-components";

type Props = {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export default function TextInput({
  placeholder,
  value,
  onChange,
  ...props
}: Props) {
  return (
    <StyledTextInput
      {...{
        type: "text",
        placeholder,
        value,
        onChange,
        ...props,
      }}
    />
  );
}

const StyledTextInput = styled.input`
  width: 100%;
  padding: 4px 12px;
  border: ${({ theme: { color } }) => `1px solid ${color.neutral.border}`};
  border-radius: 8px;
  font: ${({ theme: { font } }) => font.availableDefault16};
  color: ${({ theme: { color } }) => color.neutral.textStrong};
  box-sizing: border-box;

  &::placeholder {
    color: ${({ theme: { color } }) => color.neutral.textWeak};
  }
`;
