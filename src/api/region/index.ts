import { fetcher } from "api/fetcher";
import { Response } from "api/types";

export type RegionType = {
  id: number;
  title: string;
};

export const getRegionList = async () => {
  const res = await fetcher.get<Response<RegionType[]>>("/regions");
  return res.data;
};
