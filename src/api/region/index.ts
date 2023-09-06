import { fetcher } from "api/fetcher";
import { Response } from "api/types";

export type RegionType = {
  id: number;
  title: string;
};

type RegionData = {
  hasMore: boolean;
  regions: RegionType[];
};

export const getRegionList = async () => {
  const res = await fetcher.get<Response<RegionData>>("/regions");
  return res.data;
};

export const getUserRegions = async () => {
  const res = await fetcher.get<Response<RegionType[]>>("/users/regions");
  return res.data;
};

export const deleteUserRegion = async (id: number) => {
  const res = await fetcher.delete<Response<null>>(`/users/regions/${id}`);
  return res.data;
};

export const addUserRegion = async (regionId: number) => {
  const res = await fetcher.post<Response<null>>("/users/regions", {
    regionId,
  });
  return res.data;
};
