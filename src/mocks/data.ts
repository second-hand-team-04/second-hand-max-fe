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
  status: "Unauthenticated",
  message: "이메일 또는 비밀번호가 일치하지 않습니다",
  data: null,
};

export const successfulSignUpData = {
  code: 201,
  status: "OK",
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
    id: 1,
    nickname: "Kakamotobi",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/800px-African_Bush_Elephant.jpg",
  },
};

export const unsuccessfulUserInfoData = {
  code: 400,
  status: "Bad Request",
  message: "사용자 정보 조회를 실패했습니다",
  data: null,
};

export const successfulCategoriesData = {
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

export const successfulAllRegionsData = {
  code: 200,
  status: "OK",
  message: "나의 동네 목록 조회를 성공하였습니다",
  data: {
    hasMore: true,
    regions: [
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
  },
};

export const successfulUserRegionsData = {
  code: 200,
  status: "OK",
  message: "나의 동네 목록 조회를 성공하였습니다",
  data: {
    selectedId: 1,
    regions: [
      { id: 1, title: "개포1동" },
      // { id: 2, title: "개포2동" },
    ],
  },
};

export const successfulUserRegionSelectData = {
  code: 200,
  status: "OK",
  message: "나의 동네 목록 조회를 성공하였습니다",
  data: [
    { id: 1, title: "개포1동" },
    // { id: 2, title: "개포2동" },
  ],
};

export const successfulItemListData = {
  code: 200,
  status: "OK",
  message: "상품 목록 조회를 성공하였습니다",
  data: {
    hasMore: false,
    items: [
      {
        id: 1,
        title: "잎사귀 포스터",
        region: "역삼1동",
        status: "예약중",
        thumbnail:
          "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192cf604e7b0e6900f9ac53a43965300eb9a",
        createdAt: "2023-08-14 13:13:13",
        updatedAt: "2023-08-24 08:15:00",
        price: 5000,
        numChat: 1,
        numLikes: 2,
      },
      {
        id: 2,
        title: "잎사귀 포스터2",
        region: "역삼2동",
        status: "예약중",
        thumbnail: null,
        createdAt: "2023-08-19 11:15:01",
        updatedAt: "2023-08-22 10:15:00",
        price: null,
        numChat: 0,
        numLikes: 2,
      },
      {
        id: 3,
        title: "잎사귀 포스터3",
        region: "역삼3동",
        status: "판매중",
        thumbnail: null,
        createdAt: "2023-09-01 09:00:00",
        updatedAt: "2023-09-03 14:30:00",
        price: 15000,
        numChat: 3,
        numLikes: 7,
      },
      {
        id: 4,
        title: "잎사귀 포스터4",
        region: "역삼4동",
        status: null,
        thumbnail:
          "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192cd0bbab1214a29e381afae56101ded106",
        createdAt: "2023-08-25 16:00:00",
        updatedAt: "2023-09-02 11:45:00",
        price: 8000,
        numChat: 2,
        numLikes: 5,
      },
      {
        id: 5,
        title: "잎사귀 포스터5",
        region: "역삼5동",
        status: "예약중",
        thumbnail:
          "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192c960f4ab09fe6e38bae8c63030c9b37f9",
        createdAt: "2023-09-03 14:00:00",
        updatedAt: "2023-09-04 09:30:00",
        price: 12000,
        numChat: 1,
        numLikes: 3,
      },
      {
        id: 6,
        title: "잎사귀 포스터6",
        region: "역삼6동",
        status: "판매중",
        thumbnail:
          "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192c113e2bd2b7407c8202a97d2241a96625",
        createdAt: "2023-09-02 10:30:00",
        updatedAt: "2023-09-03 18:15:00",
        price: 9500,
        numChat: 4,
        numLikes: 9,
      },
      {
        id: 7,
        title: "잎사귀 포스터7",
        region: "역삼7동",
        status: null,
        thumbnail: null,
        createdAt: "2023-08-28 09:45:00",
        updatedAt: "2023-09-03 11:20:00",
        price: null,
        numChat: 0,
        numLikes: 1,
      },
      {
        id: 8,
        title: "잎사귀 포스터",
        region: "역삼1동",
        status: "예약중",
        thumbnail:
          "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192cf604e7b0e6900f9ac53a43965300eb9a",
        createdAt: "2023-08-14 13:13:13",
        updatedAt: "2023-08-24 08:15:00",
        price: 5000,
        numChat: 1,
        numLikes: 2,
      },
      {
        id: 9,
        title: "잎사귀 포스터2",
        region: "역삼2동",
        status: "예약중",
        thumbnail: null,
        createdAt: "2023-08-19 11:15:01",
        updatedAt: "2023-08-22 10:15:00",
        price: null,
        numChat: 0,
        numLikes: 2,
      },
      {
        id: 10,
        title: "잎사귀 포스터3",
        region: "역삼3동",
        status: "판매중",
        thumbnail: null,
        createdAt: "2023-09-01 09:00:00",
        updatedAt: "2023-09-03 14:30:00",
        price: 15000,
        numChat: 3,
        numLikes: 7,
      },
      {
        id: 11,
        title: "잎사귀 포스터4",
        region: "역삼4동",
        status: null,
        thumbnail:
          "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192cd0bbab1214a29e381afae56101ded106",
        createdAt: "2023-08-25 16:00:00",
        updatedAt: "2023-09-02 11:45:00",
        price: 8000,
        numChat: 2,
        numLikes: 5,
      },
      {
        id: 12,
        title: "잎사귀 포스터5",
        region: "역삼5동",
        status: "예약중",
        thumbnail:
          "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192c960f4ab09fe6e38bae8c63030c9b37f9",
        createdAt: "2023-09-03 14:00:00",
        updatedAt: "2023-09-04 09:30:00",
        price: 12000,
        numChat: 1,
        numLikes: 3,
      },
      {
        id: 13,
        title: "잎사귀 포스터6",
        region: "역삼6동",
        status: "판매중",
        thumbnail:
          "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192c113e2bd2b7407c8202a97d2241a96625",
        createdAt: "2023-09-02 10:30:00",
        updatedAt: "2023-09-03 18:15:00",
        price: 9500,
        numChat: 4,
        numLikes: 9,
      },
      {
        id: 14,
        title: "잎사귀 포스터7",
        region: "역삼7동",
        status: null,
        thumbnail: null,
        createdAt: "2023-08-28 09:45:00",
        updatedAt: "2023-09-03 11:20:00",
        price: null,
        numChat: 0,
        numLikes: 1,
      },
      {
        id: 15,
        title: "잎사귀 포스터",
        region: "역삼1동",
        status: "예약중",
        thumbnail:
          "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192cf604e7b0e6900f9ac53a43965300eb9a",
        createdAt: "2023-08-14 13:13:13",
        updatedAt: "2023-08-24 08:15:00",
        price: 5000,
        numChat: 1,
        numLikes: 2,
      },
      {
        id: 16,
        title: "잎사귀 포스터2",
        region: "역삼2동",
        status: "예약중",
        thumbnail: null,
        createdAt: "2023-08-19 11:15:01",
        updatedAt: "2023-08-22 10:15:00",
        price: null,
        numChat: 0,
        numLikes: 2,
      },
      {
        id: 17,
        title: "잎사귀 포스터3",
        region: "역삼3동",
        status: "판매중",
        thumbnail: null,
        createdAt: "2023-09-01 09:00:00",
        updatedAt: "2023-09-03 14:30:00",
        price: 15000,
        numChat: 3,
        numLikes: 7,
      },
      {
        id: 18,
        title: "잎사귀 포스터4",
        region: "역삼4동",
        status: null,
        thumbnail:
          "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192cd0bbab1214a29e381afae56101ded106",
        createdAt: "2023-08-25 16:00:00",
        updatedAt: "2023-09-02 11:45:00",
        price: 8000,
        numChat: 2,
        numLikes: 5,
      },
      {
        id: 19,
        title: "잎사귀 포스터5",
        region: "역삼5동",
        status: "예약중",
        thumbnail:
          "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192c960f4ab09fe6e38bae8c63030c9b37f9",
        createdAt: "2023-09-03 14:00:00",
        updatedAt: "2023-09-04 09:30:00",
        price: 12000,
        numChat: 1,
        numLikes: 3,
      },
      {
        id: 20,
        title: "잎사귀 포스터6",
        region: "역삼6동",
        status: "판매중",
        thumbnail:
          "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192c113e2bd2b7407c8202a97d2241a96625",
        createdAt: "2023-09-02 10:30:00",
        updatedAt: "2023-09-03 18:15:00",
        price: 9500,
        numChat: 4,
        numLikes: 9,
      },
      {
        id: 21,
        title: "잎사귀 포스터7",
        region: "역삼7동",
        status: null,
        thumbnail: null,
        createdAt: "2023-08-28 09:45:00",
        updatedAt: "2023-09-03 11:20:00",
        price: null,
        numChat: 0,
        numLikes: 1,
      },
    ],
  },
};

export const unSuccessfulItemListData = {
  code: 400,
  status: "Bad Request",
  message: "상품 목록 조회를 실패하였습니다",
  data: null,
};

export const successfulProductItemData = {
  code: 200,
  status: "OK",
  message: "상품 목록 조회를 성공하였습니다",
  data: [
    {
      id: 1,
      title: "잎사귀 포스터",
      status: "예약중",
      content:
        "잔여 포스터를 팝니다. 사실분들께 저렴하게 양도합니다. 포스터 상태는 아주 좋습니다.",
      updatedAt: "2023-08-24 08:15:00",
      price: 5000,
      category: "중고차",
      seller: { id: 1, nickname: "Kakamotobi" },
      numChat: 1,
      numLikes: 2,
      numViews: 3,
      isWishlisted: true,
      images: [
        {
          id: 1,
          url: "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192cf604e7b0e6900f9ac53a43965300eb9a",
        },
        {
          id: 2,
          url: "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192cf604e7b0e6900f9ac53a43965300eb9a",
        },
        {
          id: 3,
          url: "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192cf604e7b0e6900f9ac53a43965300eb9a",
        },
      ],
    },
    {
      id: 2,
      title: "잎사귀 포스터2",
      status: "예약중",
      content:
        "잔여 포스터2를 판매합니다. 포스터는 신제품이며, 저렴한 가격에 드립니다.",
      updatedAt: "2023-08-22 10:15:00",
      price: 10000,
      category: "부동산",
      seller: { id: 2, nickname: "Unknown" },
      numChat: 0,
      numLikes: 2,
      numViews: 5,
      isWishlisted: false,
      images: [],
    },
    {
      id: 3,
      title: "잎사귀 포스터3",
      status: "판매중",
      content:
        "잎사귀 포스터3 판매합니다. 포스터의 상태가 매우 좋으며, 높은 인기를 얻고 있습니다.",
      updatedAt: "2023-09-03 14:30:00",
      price: 15000,
      category: "생활가전",
      seller: { id: 3, nickname: "Unknown" },
      numChat: 3,
      numLikes: 7,
      numViews: 10,
      isWishlisted: false,
      images: [],
    },
    {
      id: 4,
      title: "잎사귀 포스터4",
      status: "예약중",
      content:
        "잔여 포스터4를 저렴한 가격에 양도합니다. 포스터 상태는 매우 좋습니다.",
      updatedAt: "2023-09-02 11:45:00",
      price: 8000,
      category: "유아동",
      seller: { id: 4, nickname: "Unknown" },
      numChat: 2,
      numLikes: 5,
      numViews: 8,
      isWishlisted: true,
      images: [
        {
          id: 4,
          url: "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192cd0bbab1214a29e381afae56101ded106",
        },
        {
          id: 5,
          url: "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192cd0bbab1214a29e381afae56101ded106",
        },
        {
          id: 6,
          url: "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192cd0bbab1214a29e381afae56101ded106",
        },
      ],
    },
    {
      id: 5,
      title: "잎사귀 포스터5",
      status: "예약중",
      content:
        "잔여 포스터5 판매합니다. 포스터는 아주 저렴한 가격에 양도합니다. 빠른 연락 부탁드립니다.",
      updatedAt: "2023-09-04 09:30:00",
      price: 12000,
      category: "유아도서",
      seller: { id: 5, nickname: "Unknown" },
      numChat: 1,
      numLikes: 3,
      numViews: 6,
      isWishlisted: true,
      images: [
        {
          id: 7,
          url: "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192c960f4ab09fe6e38bae8c63030c9b37f9",
        },
        {
          id: 8,
          url: "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192c960f4ab09fe6e38bae8c63030c9b37f9",
        },
        {
          id: 9,
          url: "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192c960f4ab09fe6e38bae8c63030c9b37f9",
        },
      ],
    },
    {
      id: 6,
      title: "잎사귀 포스터6",
      status: "판매중",
      content:
        "잔여 포스터6 판매합니다. 포스터 상태가 아주 좋으며, 많은 관심을 받고 있습니다.",
      updatedAt: "2023-09-03 18:15:00",
      price: 9500,
      category: "생활가전",
      seller: { id: 6, nickname: "Unknown" },
      numChat: 4,
      numLikes: 9,
      numViews: 15,
      isWishlisted: false,
      images: [
        {
          id: 10,
          url: "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192c113e2bd2b7407c8202a97d2241a96625",
        },
        {
          id: 11,
          url: "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192c113e2bd2b7407c8202a97d2241a96625",
        },
        {
          id: 12,
          url: "https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192c113e2bd2b7407c8202a97d2241a96625",
        },
      ],
    },
    {
      id: 7,
      title: "잎사귀 포스터7",
      status: "예약중",
      content:
        "잔여 포스터7를 판매합니다. 포스터는 아직 사용하지 않은 신제품입니다. 빠른 예약이 가능합니다.",
      updatedAt: "2023-09-03 11:20:00",
      price: 11000,
      category: "스포츠/레저",
      seller: { id: 7, nickname: "Unknown" },
      numChat: 0,
      numLikes: 1,
      numViews: 4,
      isWishlisted: false,
      images: [],
    },
  ],
};
