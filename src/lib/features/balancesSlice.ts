import { createAppSlice } from "@/lib/createAppSlice";
import { BalanceType } from "@/types/balanceType";
import { PayloadAction } from "@reduxjs/toolkit";

export interface BalancesSliceState {
  balances: BalanceType | null;
}

const initialState: BalancesSliceState = {
  balances: null,
};

export const balancesSlice = createAppSlice({
  name: "account-balances",
  initialState,
  reducers: (create) => ({
    setBalances: create.reducer(
      (state, action: PayloadAction<BalanceType | null>) => {
        state.balances = action.payload;
      }
    ),
  }),
  selectors: {
    selectBalances: (state: BalancesSliceState) => state.balances,
  },
});

export const { setBalances } = balancesSlice.actions;

export const { selectBalances } = balancesSlice.selectors;
