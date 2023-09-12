import { fetcher } from "api/fetcher";
import { Response } from "api/types";

export type ProductItemType = {
  id: number;
  title: string;
  region: string;
  status: string;
  thumbnail: string | null;
  createdAt: string;
  updatedAt: string;
  price: number | null;
  numChat: number;
  numLikes: number;
};

export type ProductItemDetails = {
  id: number;
  title: string;
  status: "판매중" | "판매완료" | "예약중";
  content: string;
  updatedAt: string; // 더 정확한 날짜 처리를 원한다면 'Date'를 사용하세요.
  price: number;
  category: string;
  seller: {
    id: number;
    nickname: string;
  };
  numChat: number;
  numLikes: number;
  numViews: number;
  isWishlisted: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
};

export type PostProductItemBody = {
  title: string;
  price: number | null;
  content: string;
  imageIds: number[];
  categoryId: number;
  regionId: number;
};

export const getProductItems = async ({
  regionId = 1,
  categoryId = 1,
  page = 0,
}: {
  regionId: number;
  categoryId: number;
  page: number;
}) => {
  const res = await fetcher.get<
    Response<{ hasMore: boolean; items: ProductItemType[] }>
  >(`/items?region=${regionId}&category=${categoryId}&page=${page}&size=10`);
  return res.data;
};

export const getProductItemDetails = async (id: number) => {
  const res = await fetcher.get<Response<ProductItemDetails>>(`/items/${id}`);
  return res.data;
};

export const postProductItem = async (body: PostProductItemBody) => {
  const res = await fetcher.post<Response<null>>("/items", body);
  return res.data;
};

export const putProductItem = async (id: number, body: PostProductItemBody) => {
  const res = await fetcher.put<Response<null>>(`/items/${id}`, body);
  return res.data;
};
