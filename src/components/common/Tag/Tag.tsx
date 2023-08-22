import { styled } from "styled-components";

export function Tag({
  title,
  isSelected,
}: {
  title: string;
  isSelected: boolean;
}) {
  return <TagButton isSelected={isSelected}>{title}</TagButton>;
}

const TagButton = styled.button<{ isSelected: boolean }>`
  display: flex;
  height: 32px;
  padding: 0px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  font: ${({ theme: { font } }) => font.displayDefault12};
  border: 1px solid
    ${({ isSelected, theme: { color } }) =>
      isSelected ? "none" : color.neutral.border};
  color: ${({ isSelected, theme: { color } }) =>
    isSelected ? color.accent.text : color.accent.textWeak};
  background: ${({ isSelected, theme: { color } }) =>
    isSelected ? color.accent.backgroundPrimary : color.accent.text};
`;
