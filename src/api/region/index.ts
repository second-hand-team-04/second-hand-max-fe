import { fetcher } from "api/fetcher";
import { Response } from "api/types";

export type RegionType = {
  id: number;
  title: string;
};

type AllRegionsData = {
  hasMore: boolean;
  regions: RegionType[];
};

type UserRegionsData = {
  selectedId: number;
  regions: RegionType[];
};

export const getAllRegions = async () => {
  const res = await fetcher.get<Response<AllRegionsData>>("/regions");
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
  return res;
};

export const postUserRegion = async (regionId: number) => {
  const res = await fetcher.post<Response<null>>("/users/regions", {
    regionId,
  });
  return res.data;
};
