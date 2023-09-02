import { styled } from "styled-components";
import NavBarTab from "./NavBarTab";
import homeIcon from "@assets/icon/home.svg";
import newsIcon from "@assets/icon/news.svg";
import heartIcon from "@assets/icon/heart.svg";
import messageIcon from "@assets/icon/message.svg";
import userCircleIcon from "@assets/icon/user-circle.svg";

export default function NavBar() {
  return (
    <StyledNavBar>
      {navBarList.map((navBarTabItem) => (
        <NavBarTab key={navBarTabItem.path} {...navBarTabItem} />
      ))}
    </StyledNavBar>
  );
}

const StyledNavBar = styled.nav`
  width: 393px;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  background-color: ${({ theme: { color } }) => color.neutral.background};
  border-top: ${({ theme: { color } }) =>
    `0.8px solid ${color.neutral.border}`};
`;

const navBarList = [
  {
    title: "홈화면",
    imgSrc: homeIcon,
    path: "/",
  },
  {
    title: "판매내역",
    imgSrc: newsIcon,
    path: "/transactions",
  },
  {
    title: "관심상품",
    imgSrc: heartIcon,
    path: "/wishlist",
  },
  {
    title: "채팅",
    imgSrc: messageIcon,
    path: "/chat",
  },
  {
    title: "내 계정",
    imgSrc: userCircleIcon,
    path: "/profile",
  },
];
