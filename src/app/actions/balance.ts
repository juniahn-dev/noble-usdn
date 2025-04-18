"use server";

import fetchData from "@/lib/fetchData";
import { BalanceType } from "@/types/balanceType";

export async function getBalance(address: string): Promise<BalanceType> {
  const response = await fetchData(
    `https://api.testnet.noble.xyz/cosmos/bank/v1beta1/balances/${address}?pagination.limit=1000`
  );

  return response;
}
