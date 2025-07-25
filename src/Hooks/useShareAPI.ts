import { useCallback } from "react";
import { Callback } from "Types/Generics";

export const useShareAPI = (shareData: ShareData, onError?: Callback) => {
  return useCallback(() => {
    if (typeof window === "undefined" || !navigator.share) {
      return;
    }
    void navigator.share(shareData).catch(() => onError?.());
  }, [shareData, onError]);
};
