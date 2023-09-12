import { fetcher } from "api/fetcher";
import { Response } from "api/types";

type WishlistItemType = {
  id: number;
  title: string;
  region: string;
  status: string;
  thumbnailUrl: string;
  updatedAt: string;
  price: number;
  numChat: number;
  numLikes: number;
};

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
