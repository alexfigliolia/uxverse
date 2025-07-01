"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { OptionalChildren } from "Types/React";

export const Portal = ({ nodeID, children }: Props) => {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!nodeID) {
      return setTarget(document.body);
    }
    const node = document.getElementById(nodeID);
    if (!node) {
      throw new Error(
        `Portal Error: A node with the ID '${nodeID}' was not found`,
      );
    }
    setTarget(node);
  }, [nodeID]);

  if (!target) {
    return null;
  }

  return createPortal(children, target);
};

interface Props extends OptionalChildren {
  nodeID?: string;
}
