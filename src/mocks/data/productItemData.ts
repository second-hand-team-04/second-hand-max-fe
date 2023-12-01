import { HTTPSTATUS } from "api/types";

export const successfulProductItemsData = {
  code: HTTPSTATUS.success,
  status: "OK",
  message: "상품 목록 조회를 성공하였습니다",
  data: {
    hasMore: false,
    items: [
      {
        id: 1,
        title: "잎사귀 포스터",
        region: "역삼동",
        status: "예약중",
        content:
          "잔여 포스터를 팝니다. 사실분들께 저렴하게 양도합니다. 포스터 상태는 아주 좋습니다.",
        updatedAt: "2023-08-24 08:15:00",
        price: 5000,
        category: "중고차",
        seller: {
          id: 1,
          nickname: "Kakamotobi",
        },
        thumbnailUrl:
          "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800",
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
        region: "역삼동",
        status: "예약중",
        content:
          "잔여 포스터2를 판매합니다. 포스터는 신제품이며, 저렴한 가격에 드립니다.",
        updatedAt: "2023-08-22 10:15:00",
        price: 10000,
        category: "부동산",
        seller: {
          id: 2,
          nickname: "Bakha",
        },
        thumbnailUrl:
          "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800",
        numChat: 0,
        numLikes: 2,
        numViews: 5,
        isWishlisted: false,
        images: [],
      },
      {
        id: 3,
        title: "잎사귀 포스터3",
        region: "역삼동",
        status: "판매중",
        content:
          "잎사귀 포스터3 판매합니다. 포스터의 상태가 매우 좋으며, 높은 인기를 얻고 있습니다.",
        updatedAt: "2023-09-03 14:30:00",
        price: 15000,
        category: "생활가전",
        seller: {
          id: 1,
          nickname: "Kakamotobi",
        },
        thumbnailUrl:
          "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800",
        numChat: 3,
        numLikes: 7,
        numViews: 10,
        isWishlisted: false,
        images: [],
      },
      {
        id: 4,
        title: "잎사귀 포스터4",
        region: "역삼동",
        status: "예약중",
        content:
          "잔여 포스터4를 저렴한 가격에 양도합니다. 포스터 상태는 매우 좋습니다.",
        updatedAt: "2023-09-02 11:45:00",
        price: 8000,
        category: "유아동",
        seller: {
          id: 1,
          nickname: "Kakamotobi",
        },
        thumbnailUrl:
          "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800",
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
        region: "역삼동",
        status: "예약중",
        content:
          "잔여 포스터5 판매합니다. 포스터는 아주 저렴한 가격에 양도합니다. 빠른 연락 부탁드립니다.",
        updatedAt: "2023-09-04 09:30:00",
        price: 12000,
        category: "유아도서",
        seller: {
          id: 3,
          nickname: "Zoey",
        },
        thumbnailUrl:
          "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800",
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
        region: "역삼동",
        status: "판매중",
        content:
          "잔여 포스터6 판매합니다. 포스터 상태가 아주 좋으며, 많은 관심을 받고 있습니다.",
        updatedAt: "2023-09-03 18:15:00",
        price: 9500,
        category: "생활가전",
        seller: {
          id: 4,
          nickname: "Jay",
        },
        thumbnailUrl:
          "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800",
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
        region: "역삼동",
        status: "예약중",
        content:
          "잔여 포스터7를 판매합니다. 포스터는 아직 사용하지 않은 신제품입니다. 빠른 예약이 가능합니다.",
        updatedAt: "2023-09-03 11:20:00",
        price: 11000,
        category: "스포츠/레저",
        seller: {
          id: 5,
          nickname: "Khundi",
        },
        thumbnailUrl:
          "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800",
        numChat: 0,
        numLikes: 1,
        numViews: 4,
        isWishlisted: false,
        images: [],
      },
    ],
  },
};

export const unSuccessfulProductItemsData = {
  code: HTTPSTATUS.badRequest,
  status: "Bad Request",
  message: "상품 목록 조회를 실패하였습니다",
  data: null,
};
