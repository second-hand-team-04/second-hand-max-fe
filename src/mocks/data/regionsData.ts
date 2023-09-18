import { HTTPSTATUS } from "api/types";

export const successfulAllRegionsData = {
  code: HTTPSTATUS.success,
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
