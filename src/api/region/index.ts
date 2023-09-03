import { fetcher } from "api/fetcher";

import { Response } from "api/types";

export type RegionType = {
  id: number;
  title: string;
};

export const getRegionList = async (): Promise<Response<RegionType[]>> => {
  const res = await fetcher.get("/regions");
  return res.data;
};
