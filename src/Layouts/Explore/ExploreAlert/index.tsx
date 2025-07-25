"use client";
import { useScrollHeightObserver } from "Hooks/useScrollHeightObserver";
import { UpIcon } from "Icons/Up";
import { Callback } from "Types/Generics";
import { SVGComponent } from "Types/React";
import "./styles.scss";

export const ExploreAlert = ({
  onClick,
  active = true,
  Icon = UpIcon,
  text = "You've reached the end of your search results",
}: Props) => {
  const [container, scrollHeight] =
    useScrollHeightObserver<HTMLDivElement>(1000);

  return (
    <div
      role="alert"
      className="explore-results__alert"
      aria-live="polite"
      aria-hidden={!active}
      style={{ "--max-height": `${scrollHeight}px` }}>
      <div ref={container}>
        <button aria-label="Return to top" onClick={onClick}>
          <div>
            <Icon aria-hidden />
          </div>
        </button>
        {active && <p>{text ?? " "}</p>}
      </div>
    </div>
  );
};

interface Props {
  active: boolean;
  onClick: Callback;
  text?: string;
  Icon?: SVGComponent;
}
