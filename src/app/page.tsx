"use client";

import ImgComponent from "@/components/Image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Wrapper from "@/components/Wrapper";
import { selectBalances } from "@/lib/features/balancesSlice";
import { selectAccount } from "@/lib/features/userSlice";
import { useAppSelector } from "@/lib/reduxHook";
import { commaNumber } from "@/lib/utils";
import AbstractToken from "@/store/tokens/AbstractToken";
import { getTokenInstance } from "@/store/tokens/getTokenInstance";
import { usdnConst } from "@/store/tokens/Usdn/Usdn";
import { ChainStatusType } from "@/types/chainTvlType";
import { useEffect, useMemo, useState } from "react";
import { getChainStatus } from "./actions/chainStatus";

export default function Home() {
  const account = useAppSelector(selectAccount);
  const balances = useAppSelector(selectBalances);

  const [defaultToken, setDefaultToken] = useState<AbstractToken | null>(
    usdnConst
  );
  const [chainStatus, setChainStatus] = useState<ChainStatusType>();

  const findTokenBalance = useMemo(() => {
    if (!balances || !defaultToken) return null;

    const tokenBalance = balances.balances.find(
      (balance) => balance.denom === defaultToken.denom
    );

    return tokenBalance
      ? Number(tokenBalance.amount) / 10 ** defaultToken.decimal
      : 0;
  }, [balances, defaultToken]);

  useEffect(() => {
    const init = async () => {
      const status = await getChainStatus();
      setChainStatus(status);
    };

    init();
  }, [account]);

  return (
    <Wrapper>
      <div className="w-full p-5 border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div>Your Balance</div>
          <Select
            value={defaultToken?.denom}
            onValueChange={(value) => {
              const selectedToken = balances?.balances
                .map((balance) => getTokenInstance(balance.denom))
                .find((token) => token?.denom === value);
              setDefaultToken(selectedToken || null);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Token" />
            </SelectTrigger>
            <SelectContent>
              {balances?.balances.map((balance, idx) => {
                const denomInstance = getTokenInstance(balance.denom);

                return (
                  <SelectItem key={idx} value={balance.denom}>
                    <ImgComponent imgSrc={denomInstance?.image || ""} />
                    {denomInstance?.symbol}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        {account ? (
          <div className="text-[1.5rem]">$ {findTokenBalance}</div>
        ) : (
          <div className="text-[1.5rem]">Please connect your wallet</div>
        )}
      </div>
      <div className="w-full mt-5 p-5 border border-gray-200 rounded-lg">
        <div className="mb-5">
          Onchain Data <span className="text-blue-400">(Mainnet)</span>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col bg-blue-50 gap-3 border p-5 rounded-lg">
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>TVL</TooltipTrigger>
                  <TooltipContent>
                    <p>Total Principal + Total Yield Accrued</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            ${" "}
            {commaNumber(
              (Number(chainStatus?.total_principal) +
                Number(chainStatus?.total_yield_accrued)) /
                10 ** 6
            )}
          </div>
          <div className="flex flex-col bg-blue-50 gap-3 border p-5 rounded-lg">
            <div>Total Principal</div>${" "}
            {commaNumber(Number(chainStatus?.total_principal) / 10 ** 6)}
          </div>
          <div className="flex flex-col bg-blue-50 gap-3 border p-5 rounded-lg">
            <div>Total Yield Accrued</div>${" "}
            {commaNumber(Number(chainStatus?.total_yield_accrued) / 10 ** 6)}
          </div>
          <div className="flex flex-col bg-blue-50 gap-3 border p-5 rounded-lg">
            <div>Total Holder</div>${" "}
            {commaNumber(Number(chainStatus?.total_holders))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
