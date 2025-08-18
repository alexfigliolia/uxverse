"use client";
import { use } from "react";
import { LiquidGlassButton } from "Components/LiquidGlassButton";
import { Propless } from "Types/React";
import { LoginContext } from "../LoginContext";

export const LoginButton = (_: Propless) => {
  const { toggle } = use(LoginContext);
  return <LiquidGlassButton onClick={toggle.open}>Enter</LiquidGlassButton>;
};
