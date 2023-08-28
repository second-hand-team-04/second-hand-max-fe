import { styled } from "styled-components";
import NavBarTab from "./NavBarTab";
import home from "@assets/icon/home.svg";
import news from "@assets/icon/news.svg";
import heart from "@assets/icon/heart.svg";
import message from "@assets/icon/message.svg";
import userCircle from "@assets/icon/user-circle.svg";
import { useState } from "react";

export default function NavBar() {
  const [selectedTab, setSelectedTab] = useState<string>("홈화면");

  const onTabClick = (tabTitle: string) => {
    setSelectedTab(tabTitle);
  };

  return (
    <StyledNavBar>
      {navBarList.map((navBarTabItem) => (
        <NavBarTab
          {...{
            navBarTabItem,
            isSelected: selectedTab === navBarTabItem.title,
            onTabClick,
          }}
        />
      ))}
    </StyledNavBar>
  );
}

const StyledNavBar = styled.div`
  display: flex;
  width: 393px;
  padding: 8px 16px;
  justify-content: space-between;
`;

const navBarList = [
  {
    title: "홈화면",
    imageUrl: home,
    altText: "home",
  },
  {
    title: "판매내역",
    imageUrl: news,
    altText: "news",
  },
  {
    title: "관심상품",
    imageUrl: heart,
    altText: "heart",
  },
  {
    title: "채팅",
    imageUrl: message,
    altText: "message",
  },
  {
    title: "내 계정",
    imageUrl: userCircle,
    altText: "userCircle",
  },
];
