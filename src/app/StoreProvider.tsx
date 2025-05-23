"use client";

import { AppStore, makeStore } from "@/store/store";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current != null) {
      const unsubscribe = setupListeners(storeRef.current.dispatch);

      return unsubscribe;
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
