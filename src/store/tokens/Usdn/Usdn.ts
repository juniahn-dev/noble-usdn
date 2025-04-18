import AbstractToken from "../AbstractToken";
import consts from "./constant";

export const usdnConst = consts;

class UsdnToken extends AbstractToken {
  constructor() {
    super({ ...consts });
  }
}

export default UsdnToken;
