import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

type Props = {
  title: string;
  imgSrc: string;
  path: string;
  isActive: boolean;
};

export default function NavBarTab({ title, imgSrc, path, isActive }: Props) {
  return (
    <StyledNavBarTab to={path} className={isActive ? "active" : ""}>
      <TabImage src={imgSrc} alt={title} />
      <TabTitle>{title}</TabTitle>
    </StyledNavBarTab>
  );
}

const StyledNavBarTab = styled(NavLink)`
  width: 48px;
  height: 48px;
  padding: 4px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  &.active > img {
    filter: ${({ theme: { filter } }) => filter.neutralTextStrong};
  }

  &.active > span {
    color: ${({ theme: { color } }) => color.neutral.textStrong};
  }
`;

const TabImage = styled.img`
  margin: 0 auto;
  width: 24px;
  height: 24px;
  filter: ${({ theme: { filter } }) => filter.neutralTextWeak};
`;

const TabTitle = styled.span`
  display: flex;
  margin: 0 auto;
  height: 16px;
  font: ${({ theme: { font } }) => font.availableStrong10};
  color: ${({ theme: { color } }) => color.neutral.textWeak};
`;
