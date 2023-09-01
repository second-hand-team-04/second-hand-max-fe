import { fetcher } from "api/fetcher";
import { RegionType } from "./types";
import { Response } from "api/types";

export const getRegionList = async (): Promise<Response<RegionType[]>> => {
  const res = await fetcher.get("/regions");
  return res.data;
};
