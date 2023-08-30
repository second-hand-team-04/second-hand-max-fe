import { styled } from "styled-components";

export function Tag({
  children,
  tag,
  isSelected,
  onClick,
}: {
  children: React.ReactNode;
  tag: { id: number; title: string; imageUrl: string };
  isSelected: boolean;
  onClick?: (tagTitle: string) => void;
}) {
  return (
    <StyledTag onClick={() => onClick?.(tag.title)} $isSelected={isSelected}>
      {children}
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
