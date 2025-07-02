"use client";
import { useCallback } from "react";
import { LiquidGlassButton } from "Components/LiquidGlassButton";
import { Suspended } from "HOCs/Suspended";
import { useAppendSearchParam } from "Hooks/useAppendSearchParam";
import { Propless } from "Types/React";
import { LOGIN_QUERY_PARAM } from "../Login";

export const LoginButton = Suspended((_: Propless) => {
  const { appendParam } = useAppendSearchParam();

  const onClick = useCallback(() => {
    appendParam(LOGIN_QUERY_PARAM, "1");
  }, [appendParam]);

  return (
    <LiquidGlassButton onClick={onClick}>Let&apos;s Go!</LiquidGlassButton>
  );
});
