import { styled } from "styled-components";

export type TagType = {
  title: string;
  isSelected: boolean;
  onClick: () => void;
};

export function Tag({ title, isSelected, onClick }: TagType) {
  return (
    <StyledTag onClick={onClick} $isSelected={isSelected}>
      {title}
    </StyledTag>
  );
}

const StyledTag = styled.button<{ $isSelected: boolean }>`
  height: 32px;
  padding: 0px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  color: ${({ $isSelected, theme: { color } }) =>
    $isSelected ? color.accent.text : color.accent.textWeak};
  background: ${({ $isSelected, theme: { color } }) =>
    $isSelected ? color.accent.backgroundPrimary : color.accent.text};
  border: ${({ $isSelected, theme: { color } }) =>
    $isSelected ? "none" : `1px solid ${color.neutral.border}`};
  border-radius: 50px;
  font: ${({ theme: { font } }) => font.displayDefault12};
`;
