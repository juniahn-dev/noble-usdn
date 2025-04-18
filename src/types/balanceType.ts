import { AmountType } from "./amountType";
import { PaginationType } from "./paginationType";

export interface BalanceType {
  balances: AmountType[];
  pagination: PaginationType;
}
