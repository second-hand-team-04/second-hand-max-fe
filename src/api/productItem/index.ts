import { fetcher } from "api/fetcher";
import { Response } from "api/types";

export type ProductItemStatus = "판매중" | "판매완료" | "예약중";

export type ProductItemType = {
  id: number;
  title: string;
  region: string;
  status: ProductItemStatus;
  sellerId: number;
  thumbnailUrl: string | null;
  createdAt: string;
  updatedAt: string;
  price: number | null;
  numChat: number;
  numLikes: number;
};

export type ProductItemDetails = {
  id: number;
  title: string;
  status: ProductItemStatus;
  content: string;
  updatedAt: string;
  price: number;
  category: { id: number; title: string };
  seller: {
    id: number;
    nickname: string;
  };
  numChat: number;
  numLikes: number;
  numViews: number;
  isWishlisted: boolean;
  images: PictureType[] | null;
};

export type ProductItemBody = {
  title: string;
  price: number | null;
  content: string;
  imageIds: number[] | null;
  categoryId: number;
  regionId: number;
};

export type PictureType = {
  id: number;
  imageUrl: string;
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

export const postProductItem = async (body: ProductItemBody) => {
  const res = await fetcher.post<Response<{ id: number }>>("/items", body);
  return res.data;
};

export const putProductItem = async (id: number, body: ProductItemBody) => {
  const res = await fetcher.put<Response<null>>(`/items/${id}`, body);
  return res.data;
};

export const patchProductItemStatus = async (
  id: number,
  body: { status: number }
) => {
  const res = await fetcher.patch<Response<null>>(`/items/${id}`, body);
  return res.data;
};

export const deleteProductItem = async (id: number) => {
  const res = await fetcher.delete<Response<null>>(`items/${id}`);
  return res.data;
};

export const postImageToS3 = async (body: FormData) => {
  const res = await fetcher.post<Response<{ id: number; imageUrl: string }>>(
    "/images",
    body,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};
