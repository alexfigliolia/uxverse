"use client";
import { useEffect, useRef, useState } from "react";
import { ActivePeople } from "Components/ActivePeople";
import "./styles.scss";

export const RecentlyActive = () => {
  const node = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    if (node.current) {
      setHeight(node.current.scrollHeight);
    }
  }, []);

  return (
    <ActivePeople
      ref={node}
      className="recently-active-people"
      style={{
        "--max-height": height ? `${height}px` : undefined,
      }}
    />
  );
};
