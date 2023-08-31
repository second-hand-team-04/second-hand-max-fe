import { fetcher } from "api/fetcher";
import { AxiosResponse } from "axios";
import { RegionType } from "./types";

export const getRegionList = async () => {
  const res = await fetcher.get<AxiosResponse<RegionType[]>>("/regions");
  return res.data;
};
