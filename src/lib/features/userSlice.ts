import { createAppSlice } from "@/lib/createAppSlice";
import { UserType } from "@/types/userType";
import { PayloadAction } from "@reduxjs/toolkit";

export interface UserSliceState {
  account: UserType | null;
}

const initialState: UserSliceState = {
  account: null,
};

export const userSlice = createAppSlice({
  name: "keplr-account",
  initialState,
  reducers: (create) => ({
    setAccount: create.reducer(
      (state, action: PayloadAction<UserType | null>) => {
        state.account = action.payload;
      }
    ),
  }),
  selectors: {
    selectAccount: (state: UserSliceState) => state.account,
  },
});

export const { setAccount } = userSlice.actions;

export const { selectAccount } = userSlice.selectors;
