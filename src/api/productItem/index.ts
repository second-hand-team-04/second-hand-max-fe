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
