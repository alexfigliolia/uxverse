"use client";
import { useId } from "react";
import { BottomSheet } from "@figliolia/bottom-sheet";
import { useSearchParamToggle } from "Hooks/useSearchParamToggle";
import { AppleIcon } from "Icons/AppleIcon";
import { GoogleIcon } from "Icons/Google";
import { Propless } from "Types/React";
import "./styles.scss";

export const LOGIN_QUERY_PARAM = "login";

export const Login = (_: Propless) => {
  const titleID = useId();
  const { open, toggle } = useSearchParamToggle(LOGIN_QUERY_PARAM);
  return (
    <BottomSheet
      dim
      notch
      open={open}
      className="login-sheet"
      close={toggle.close}
      aria-labelledby={titleID}>
      <h2 id={titleID}>Login</h2>
      <p>Join your community</p>
      <div className="actions">
        <button aria-label="Login with Apple">
          Apple <AppleIcon />
        </button>
        <button aria-label="Login with Google">
          Google <GoogleIcon />
        </button>
      </div>
    </BottomSheet>
  );
};
