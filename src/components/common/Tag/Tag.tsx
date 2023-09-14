import { styled } from "styled-components";

export type TagType = {
  tag: {
    id: number;
    title: string;
  };
  isSelected: boolean;
  onClick: () => void;
};

export function Tag({ tag, isSelected, onClick }: TagType) {
  return (
    <StyledTag onClick={onClick} $isSelected={isSelected}>
      {tag.title}
    </StyledTag>
  );
}

const StyledTag = styled.button<{ $isSelected: boolean }>`
  display: flex;
  height: 32px;
  padding: 0px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  font: ${({ theme: { font } }) => font.displayDefault12};
  border: 1px solid
    ${({ $isSelected, theme: { color } }) =>
      $isSelected ? "none" : color.neutral.border};
  color: ${({ $isSelected, theme: { color } }) =>
    $isSelected ? color.accent.text : color.accent.textWeak};
  background: ${({ $isSelected, theme: { color } }) =>
    $isSelected ? color.accent.backgroundPrimary : color.accent.text};
`;
