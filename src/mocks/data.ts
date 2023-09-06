export const successfulSignInData = {
  code: 200,
  status: "OK",
  message: "로그인을 성공했습니다",
  data: {
    accessToken: "accessToken",
    refreshToken: "refreshToken",
    user: {
      nickname: "Kakamotobi",
      profileImageUrl: "blah",
    },
  },
};

export const unsuccessfulSignInData = {
  code: 401,
  status: "UNAUTHENTICATED",
  message: "이메일 또는 비밀번호가 일치하지 않습니다",
  data: null,
};

export const successfulSignUpData = {
  code: 201,
  status: "Bad Request",
  message: "회원가입을 성공했습니다",
  data: null,
};

export const unSuccessfulSignUpData = {
  code: 400,
  status: "Bad Request",
  message: "회원가입을 실패했습니다",
  data: null,
};

export const successfulSignOutData = {
  code: 200,
  status: "OK",
  message: "로그아웃을 성공했습니다",
  data: null,
};

export const successfulRefreshAccessToken = {
  code: 200,
  status: "OK",
  message: "Access Token 발급을 성공했습니다",
  data: {
    accessToken: "accessToken",
  },
};

export const unSuccessfulRefreshAccessToken = {
  code: 401,
  status: "Bad Request",
  message: "Access Token 발급을 실패했습니다",
  data: null,
};

export const successfulUserInfoData = {
  code: 200,
  status: "OK",
  message: "사용자 정보 조회를 성공하였습니다",
  data: {
    nickname: "Kakamotobi",
    profileImageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/800px-African_Bush_Elephant.jpg",
  },
};

export const unsuccessfulUserInfoData = {
  code: 400,
  status: "Bad Request",
  message: "사용자 정보 조회를 실패했습니다",
  data: null,
};

export const categoriesData = {
  code: 200,
  status: "OK",
  message: "카테고리 목록 조회를 성공하였습니다",
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

export const regionListData = {
  code: 200,
  status: "OK",
  message: "동네 목록 조회를 성공하였습니다",
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
