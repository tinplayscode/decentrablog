import React, { createContext } from "react";

const NearContext = createContext({
  user: {},
  walletConnection: {},
  setUser: () => {},
  setWalletConnection: () => {},
});

export default NearContext;
