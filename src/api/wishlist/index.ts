import { fetcher } from "api/fetcher";
import { ProductItemType } from "api/productItem";
import { Response } from "api/types";

type WishlistItemType = {
  category: {
    id: number;
    title: string;
  };
} & ProductItemType;

type WishlistItemsData = {
  hasMore: boolean;
  items: WishlistItemType[];
};

export const getWishlistItems = async ({
  categoryId = 1,
  page = 0,
}: {
  categoryId: number;
  page: number;
}) => {
  const res = await fetcher.get<Response<WishlistItemsData>>(
    `/users/wishlist?category=${categoryId}&page=${page}&size=10`
  );
  return res.data;
};

export const postWishlistItem = async (itemId: number) => {
  const res = await fetcher.post<Response<null>>(`/users/wishlist/${itemId}`);
  return res.data;
};

export const deleteWishlistItem = async (itemId: number) => {
  const res = await fetcher.delete<Response<null>>(`/users/wishlist/${itemId}`);
  return res.data;
};
