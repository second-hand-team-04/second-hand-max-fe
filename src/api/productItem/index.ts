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

export const getProductItems = async () => {
  const res = await fetcher.get<Response<ProductItemType[]>>(
    `/items?region=${regionNum}&category=${categoryNum}`
  );
  return res.data;
};

const regionNum = 1;
const categoryNum = 1;
