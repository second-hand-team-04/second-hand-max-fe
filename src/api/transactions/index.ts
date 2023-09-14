import { fetcher } from "api/fetcher";
import { ProductItemType } from "api/productItem";
import { Response } from "api/types";

type TransactionsData = {
  hasMore: boolean;
  items: ProductItemType[];
};

export const getTransactions = async ({
  status,
  page = 0,
}: {
  status?: "0" | "1,3" | "2";
  page: number;
}) => {
  const res = await fetcher.get<Response<TransactionsData>>(
    `/users/transactions?${
      status ? `status=${status}` : ""
    }&page=${page}&size=10`
  );
  return res.data;
};
