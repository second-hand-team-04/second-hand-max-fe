import { styled } from "styled-components";

type Props = {
  navBarTabItem: {
    title: string;
    imageUrl: string;
    altText: string;
  };
  isSelected: boolean;
  onTabClick: (tabTitle: string) => void;
};

export default function NavBarTab({
  navBarTabItem,
  isSelected,
  onTabClick,
}: Props) {
  return (
    <StyledNavBarTab onClick={() => onTabClick(navBarTabItem.title)}>
      <TabImage
        $isSelected={isSelected}
        src={navBarTabItem.imageUrl}
        alt={navBarTabItem.altText}
      />
      <TabTitle $isSelected={isSelected}>{navBarTabItem.title}</TabTitle>
    </StyledNavBarTab>
  );
}

const StyledNavBarTab = styled.button`
  display: flex;
  flex-direction: column;
  width: 48px;
  height: 48px;
  padding: 4px 0;
`;

const TabImage = styled.img<{ $isSelected: boolean }>`
  margin: 0 auto;
  width: 24px;
  height: 24px;
  filter: ${({ theme: { filter }, $isSelected }) =>
    $isSelected ? filter.neutralTextStrong : filter.neutralTextWeak};
`;

const TabTitle = styled.span<{ $isSelected: boolean }>`
  display: flex;
  margin: 0 auto;
  height: 16px;
  color: ${({ theme: { color }, $isSelected }) =>
    $isSelected ? color.neutral.textStrong : color.neutral.textWeak};
  font: ${({ theme: { font }, $isSelected }) =>
    $isSelected ? font.availableStrong10 : font.availableStrong10};
`;
