import { styled } from "styled-components";
import NavBarTab from "./NavBarTab";
import homeIcon from "@assets/icon/home.svg";
import newsIcon from "@assets/icon/news.svg";
import heartIcon from "@assets/icon/heart.svg";
import messageIcon from "@assets/icon/message.svg";
import userCircleIcon from "@assets/icon/user-circle.svg";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NavBar() {
  const location = useLocation();
  const [activePath, setActivePath] = useState("");
  // const { data: userInfo } = useUserInfoQuery();

  useEffect(() => {
    // "내 계정"("/profile") 탭은 SignInPage("/signin")와 MyProfilePage("/profile")가 공유.
    console.log("location.pathname:", location.pathname);

    if (location.pathname === "/signin") {
      setActivePath("/profile");
    } else {
      setActivePath(location.pathname);
    }
  }, [location.pathname]);

  return (
    <StyledNavBar>
      {navBarList.map((navBarTabItem) => (
        <NavBarTab
          key={navBarTabItem.path}
          {...navBarTabItem}
          isActive={activePath === navBarTabItem.path}
        />
      ))}
    </StyledNavBar>
  );
}

const StyledNavBar = styled.nav`
  position: absolute;
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
