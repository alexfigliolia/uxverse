"use client";
import { useRouter } from "next/navigation";
import { useCallback, useId, useMemo } from "react";
import { BottomSheet } from "Components/BottomSheet";
import { Suspended } from "HOCs/Suspended";
import { useSearchParamToggle } from "Hooks/useSearchParamToggle";
import { AppleIcon } from "Icons/AppleIcon";
import { GoogleIcon } from "Icons/Google";
import { createTrapNodeCache } from "Tools/CreateModalContext";
import { Propless } from "Types/React";
import "./styles.scss";

export const LOGIN_QUERY_PARAM = "login";

export const Login = Suspended((_: Propless) => {
  const titleID = useId();
  const router = useRouter();
  const { open, toggle } = useSearchParamToggle(LOGIN_QUERY_PARAM);

  const toFeed = useCallback(() => {
    router.push("/feed");
  }, [router]);

  const cacheTrapNode = useMemo(() => createTrapNodeCache(toggle), [toggle]);

  return (
    <BottomSheet
      dim
      notch
      open={open}
      ref={cacheTrapNode}
      className="login-sheet"
      close={toggle.close}
      aria-labelledby={titleID}>
      <h2 id={titleID}>Login</h2>
      <p>Join your community</p>
      <div className="actions">
        <button onClick={toFeed} aria-label="Login with Apple">
          Apple <AppleIcon />
        </button>
        <button onClick={toFeed} aria-label="Login with Google">
          Google <GoogleIcon />
        </button>
      </div>
    </BottomSheet>
  );
});
