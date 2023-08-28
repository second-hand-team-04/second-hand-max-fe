import { styled } from "styled-components";
import Button from "../Button/Button";

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
    <Button
      style={{
        width: "48px",
        height: "48xp",
        padding: "4px 0",
      }}
      variant="plain"
      onClick={() => onTabClick(navBarTabItem.title)}>
      <TabImage
        $isSelected={isSelected}
        src={navBarTabItem.imageUrl}
        alt={navBarTabItem.altText}
      />
      <TabTitle $isSelected={isSelected}>{navBarTabItem.title}</TabTitle>
    </Button>
  );
}

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
  font: ${({ theme: { font } }) => font.availableStrong10};
`;
