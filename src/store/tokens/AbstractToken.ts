import { ConstsType } from "@/types/constType";

abstract class AbstractToken {
  readonly denom: string;
  readonly symbol: string;
  readonly decimal: number;
  readonly image: string;

  constructor({ denom, symbol, decimal, image }: ConstsType) {
    this.denom = denom;
    this.symbol = symbol;
    this.decimal = decimal;
    this.image = image;
  }
}

export default AbstractToken;
