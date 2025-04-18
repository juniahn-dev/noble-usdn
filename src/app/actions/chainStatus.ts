"use server";

import fetchData from "@/lib/fetchData";
import { ChainStatusType } from "@/types/chainTvlType";

export async function getChainStatus(): Promise<ChainStatusType> {
  const response = await fetchData(
    "https://api.noble.xyz/noble/dollar/v1/stats"
  );

  return response;
}
