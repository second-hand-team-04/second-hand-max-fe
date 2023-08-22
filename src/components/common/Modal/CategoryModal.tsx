import {
  IconWrapper,
  ModalContainer,
  ModalHeader,
  ModalTitle,
} from "./RegionModal";
import { ModalList, ModalListItem } from "./RegionSelectModal";

export function CategoryModal() {
  const onCategoryItemClick = (itemId: number) => {
    console.log("카테고리 선택", `카테고리 ${itemId}`);
  };

  return (
    <ModalContainer>
      <ModalHeader>
        <ModalTitle>카테고리</ModalTitle>
        <IconWrapper>
          <img src="src/assets/icon/x.svg" alt="close" />
        </IconWrapper>
      </ModalHeader>
      <ModalList>
        {list.map((item) => (
          <CategoryItem
            key={item.id}
            item={item}
            onClick={onCategoryItemClick}
          />
        ))}
      </ModalList>
    </ModalContainer>
  );
}

function CategoryItem({
  item,
  onClick,
}: {
  item: { id: number; title: string; imageUrl: string };
  onClick: (itemId: number) => void;
}) {
  return (
    <ModalListItem onClick={() => onClick(item.id)}>
      {item.title}
      {/* 이미지 확인용 */}
      {/* <img width="40px" height="40px" src={item.imageUrl} alt={item.title} /> */}
    </ModalListItem>
  );
}

const list = [
  { id: 1, title: "전체보기", imageUrl: "https://i.ibb.co/LSkHKbL/star.png" },
  {
    id: 2,
    title: "부동산",
    imageUrl: "https://i.ibb.co/41ScRXr/real-estate.png",
  },
  { id: 3, title: "중고차", imageUrl: "https://i.ibb.co/bLW8sd7/car.png" },
  {
    id: 4,
    title: "디지털기기",
    imageUrl: "https://i.ibb.co/cxS7Fhc/digital.png",
  },
  {
    id: 5,
    title: "생활가전",
    imageUrl: "https://i.ibb.co/F5z7vV9/domestic.png",
  },
  {
    id: 6,
    title: "가구/인테리어",
    imageUrl: "https://i.ibb.co/cyYH5V8/furniture.png",
  },
  { id: 7, title: "유아동", imageUrl: "https://i.ibb.co/VNKYZTK/baby.png" },
  {
    id: 8,
    title: "유아도서",
    imageUrl: "https://i.ibb.co/LrwjRdf/baby-book.png",
  },
  {
    id: 9,
    title: "스포츠/레저",
    imageUrl: "https://i.ibb.co/hXVgTyd/sports.png",
  },
  {
    id: 10,
    title: "여성잡화",
    imageUrl: "https://i.ibb.co/yPwkyg3/woman-accessories.png",
  },
  {
    id: 11,
    title: "여성의류",
    imageUrl: "https://i.ibb.co/4fvj6SC/woman-apparel.png",
  },
  {
    id: 12,
    title: "남성패션/잡화",
    imageUrl: "https://i.ibb.co/wwfyjyB/man-apparel.png",
  },
  { id: 13, title: "게임/취미", imageUrl: "https://i.ibb.co/cwJ74M4/game.png" },
  {
    id: 14,
    title: "뷰티/미용",
    imageUrl: "https://i.ibb.co/cXrrK0m/beauty.png",
  },
  {
    id: 15,
    title: "반려동물용품",
    imageUrl: "https://i.ibb.co/CbwHdNr/pet.png",
  },
  { id: 16, title: "도서/음반", imageUrl: "https://i.ibb.co/7WjKkdt/book.png" },
  {
    id: 17,
    title: "티켓,교환권",
    imageUrl: "https://i.ibb.co/kBhhs2p/ticket.png",
  },
  { id: 18, title: "생활", imageUrl: "https://i.ibb.co/T0mnp8m/kitchen.png" },
  {
    id: 19,
    title: "가공식품",
    imageUrl: "https://i.ibb.co/S0rSyxr/processed-foods.png",
  },
  { id: 20, title: "식물", imageUrl: "https://i.ibb.co/rwZhRqh/plant.png" },
  {
    id: 21,
    title: "기타 중고물품",
    imageUrl: "https://i.ibb.co/tCyMPf5/etc.png",
  },
  { id: 22, title: "삽니다", imageUrl: "https://i.ibb.co/g7Gc1w0/buy.png" },
];
