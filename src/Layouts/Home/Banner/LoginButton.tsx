"use client";
import { useCallback } from "react";
import { LiquidGlassButton } from "Components/LiquidGlassButton";
import { Suspended } from "HOCs/Suspended";
import { useMutateSearchParams } from "Hooks/useMutateSearchParams";
import { Propless } from "Types/React";
import { LOGIN_QUERY_PARAM } from "../Login";

export const LoginButton = Suspended((_: Propless) => {
  const { appendParam } = useMutateSearchParams();

  const onClick = useCallback(() => {
    appendParam(LOGIN_QUERY_PARAM, "1");
  }, [appendParam]);

  return (
    <LiquidGlassButton onClick={onClick}>Let&apos;s Go!</LiquidGlassButton>
  );
});
