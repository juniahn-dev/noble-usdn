export const checkKeplr = (): typeof window.keplr => {
  if (typeof window === "undefined" || !window.keplr) {
    alert("Please install the Keplr extension.");
    throw new Error("Keplr Wallet is not installed.");
  }

  return window.keplr;
};
