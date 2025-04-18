import AbstractToken from "./AbstractToken";
import UsdcToken from "./Usdc/Usdc";
import UsdnToken from "./Usdn/Usdn";

export const getTokenInstance = (decimal?: string): AbstractToken | null => {
  switch (decimal) {
    case "uusdn":
      return new UsdnToken();
    case "uusdc":
      return new UsdcToken();
    default:
      return null;
  }
};
