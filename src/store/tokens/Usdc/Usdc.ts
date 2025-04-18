import AbstractToken from "../AbstractToken";
import consts from "./constant";

export const usdcConst = consts;

class UsdcToken extends AbstractToken {
  constructor() {
    super({ ...consts });
  }
}

export default UsdcToken;
