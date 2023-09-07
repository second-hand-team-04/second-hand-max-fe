export const successfulSignInData = {
  code: 200,
  status: "OK",
  data: {
    accessToken: "accessToken",
    refreshToken: "refreshToken",
    user: {
      nickname: "Kakamotobi",
      profileImageUrl: "blah",
    },
  },
  message: "로그인을 성공했습니다",
};

export const unsuccessfulSignInData = {
  code: 401,
  status: "OK",
  data: null,
  message: "로그인을 실패했습니다",
};

export const successfulSignUpData = {
  code: 201,
  stauts: "OK",
  data: null,
  message: "회원가입을 성공했습니다",
};

export const unSuccessfulSignUpData = {
  code: 400,
  stauts: "OK",
  data: null,
  message: "회원가입을 실패했습니다",
};

// TODO: `<Response>`형태로 변경
export const categoriesData = {
  data: [
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
    {
      id: 13,
      title: "게임/취미",
      imageUrl: "https://i.ibb.co/cwJ74M4/game.png",
    },
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
    {
      id: 16,
      title: "도서/음반",
      imageUrl: "https://i.ibb.co/7WjKkdt/book.png",
    },
    {
      id: 17,
      title: "티켓,교환권",
      imageUrl: "https://i.ibb.co/kBhhs2p/ticket.png",
    },
    { id: 18, title: "생활", imageUrl: "https://i.ibb.co/T0mnp8m/kitchen.png" },
  ],
};

// TODO: `<Response>`형태로 변경
export const regionListData = {
  data: [
    { id: 1, title: "서울 강남구 개포1동" },
    { id: 2, title: "서울 강남구 개포2동" },
    { id: 3, title: "서울 강남구 개포3동" },
    { id: 4, title: "서울 강남구 개포1동" },
    { id: 5, title: "서울 강남구 개포2동" },
    { id: 6, title: "서울 강남구 개포3동" },
    { id: 7, title: "서울 강남구 개포1동" },
    { id: 8, title: "서울 강남구 개포2동" },
    { id: 9, title: "서울 강남구 개포3동" },
    { id: 10, title: "서울 강남구 개포1동" },
    { id: 11, title: "서울 강남구 개포2동" },
    { id: 12, title: "서울 강남구 개포3동" },
    { id: 13, title: "서울 강남구 개포1동" },
    { id: 14, title: "서울 강남구 개포2동" },
    { id: 15, title: "서울 강남구 개포3동" },
  ],
};

export const successfulUserInfoData = {
  code: 200,
  status: "OK",
  data: {
    id: 1,
    nickname: "꼬질 망그러진 곰",
    profileImageUrl:
      "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192c960f4ab09fe6e38bae8c63030c9b37f9",
  },
  message: "사용자 정보 조회를 성공하였습니다",
};

export const unsuccessfulUserInfoData = {
  code: 401,
  status: "OK",
  data: null,
  message: "유저 정보를 가져오는데 실패했습니다",
};
