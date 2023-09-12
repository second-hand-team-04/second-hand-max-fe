export type Response<T> = {
  code: number;
  status: string;
  data: T;
  message: string;
};

export type ProductItemFilter = {
  regionId: number;
  categoryId: number;
};
