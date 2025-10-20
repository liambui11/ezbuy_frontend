"use client";
import { PropsWithChildren, useEffect, useMemo } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/redux/store";

export default function AppProviders({ children }: PropsWithChildren) {
  const store = useMemo(() => makeStore(), []);

  return <Provider store={store}>{children}</Provider>;
}
