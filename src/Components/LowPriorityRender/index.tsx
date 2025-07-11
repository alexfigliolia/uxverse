"use client";
import { useEffect, useState } from "react";
import { useIdleCallback } from "@figliolia/react-hooks";
import { OptionalChildren } from "Types/React";
import "requestidlecallback-polyfill";

export const LowPriorityRender = ({ children }: Required<OptionalChildren>) => {
  const manager = useIdleCallback();
  const [render, setRender] = useState(false);

  useEffect(() => {
    manager.execute(() => setRender(true));
  }, [manager]);

  if (!render) {
    return null;
  }

  return children;
};
