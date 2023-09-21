import { CategoryTag } from "@hooks/useRandomCategories";
import { fetcher } from "api/fetcher";
import { ProductItemType } from "api/productItem";
import { Response } from "api/types";

type WishlistItemType = {
  category: CategoryTag;
} & ProductItemType;

type WishlistItemsData = {
  hasMore: boolean;
  items: WishlistItemType[];
};

type WishlistItemsCategoriesData = {
  categories: CategoryTag[];
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

export const getWishlistItemsCategories = async () => {
  const res = await fetcher.get<Response<WishlistItemsCategoriesData>>(
    "/users/wishlist/categories"
  );
  return res.data;
};
