import { fetcher } from "api/fetcher";
import { Response } from "api/types";

export type RegionType = {
  id: number;
  title: string;
};

type RegionsData = {
  hasMore: boolean;
  regions: RegionType[];
};

type UserRegionsData = {
  selectedId: number;
  regions: RegionType[];
};

export const getRegions = async ({
  page = 0,
  regionTitle,
}: {
  page: number;
  regionTitle?: string;
}) => {
  const res = await fetcher.get<Response<RegionsData>>(
    `/regions?page=${page}&size=20${regionTitle ? `&title=${regionTitle}` : ""}`
  );
  return res.data;
};

export const getUserRegions = async () => {
  const res = await fetcher.get<Response<UserRegionsData>>("/users/regions");
  return res.data;
};

// 동네 선택
export const patchUserRegion = async (id: number) => {
  const res = await fetcher.patch<Response<null>>(`/users/regions/${id}`);
  return res.data;
};

export const deleteUserRegion = async (id: number) => {
  const res = await fetcher.delete<Response<null>>(`/users/regions/${id}`);
  return res.data;
};

export const postUserRegion = async (id: number) => {
  const res = await fetcher.post<Response<null>>("/users/regions", {
    id,
  });
  return res.data;
};
