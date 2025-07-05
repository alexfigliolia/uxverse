"use client";
import { MouseEvent, TouchEvent, useCallback, useMemo, useState } from "react";
import { classnames } from "@figliolia/classnames";
import { Avatar } from "Components/Avatar";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { Formatting } from "Tools/Formatting";
import { Propless } from "Types/React";
import "./styles.scss";

const USERS = new Array(6).fill(null);

export const AvatarGroup = (_: Propless) => {
  const [index, setIndex] = useState(-1);

  const onMouseEnter = useCallback(
    (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
      const index = parseInt((e.target as HTMLDivElement).dataset.index ?? "");
      if (isNaN(index)) {
        return;
      }
      setIndex(index);
    },
    [],
  );

  const onMouseLeave = useCallback(() => {
    setIndex(-1);
  }, []);

  const fade = useMemo(() => index !== -1, [index]);

  const visibleWindow = useMemo(() => USERS.slice(0, 5), []);
  const remaining = useMemo(
    () => USERS.length - visibleWindow.length,
    [visibleWindow.length],
  );

  return (
    <div className="avatar-group">
      <ul>
        {visibleWindow.map((_, i) => {
          const active = i === index;
          return (
            <li key={i}>
              <Avatar
                data-index={i}
                className={classnames({ hovered: active, fade })}
                onMouseLeave={onMouseLeave}
                onMouseEnter={onMouseEnter}
                onTouchStart={onMouseEnter}
                onTouchEnd={onMouseLeave}
                style={{ "--index": i + 1, "--length": 6 + 1 }}
              />
            </li>
          );
        })}
      </ul>
      {remaining && (
        <button>
          and{" "}
          <ReducedLetterSpacing Tag="strong">
            {Formatting.formatCompact(45)} others
          </ReducedLetterSpacing>{" "}
          you follow
        </button>
      )}
    </div>
  );
};
