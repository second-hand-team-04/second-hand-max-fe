import { styled } from "styled-components";
import NavBarTab from "./NavBarTab";
import homeIcon from "@assets/icon/home.svg";
import newsIcon from "@assets/icon/news.svg";
import heartIcon from "@assets/icon/heart.svg";
import messageIcon from "@assets/icon/message.svg";
import userCircleIcon from "@assets/icon/user-circle.svg";
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
    imageUrl: homeIcon,
    altText: "home",
  },
  {
    title: "판매내역",
    imageUrl: newsIcon,
    altText: "news",
  },
  {
    title: "관심상품",
    imageUrl: heartIcon,
    altText: "heart",
  },
  {
    title: "채팅",
    imageUrl: messageIcon,
    altText: "message",
  },
  {
    title: "내 계정",
    imageUrl: userCircleIcon,
    altText: "userCircle",
  },
];
