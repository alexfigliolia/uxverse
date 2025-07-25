import { UpIcon } from "Icons/Up";
import { Callback } from "Types/Generics";
import "./styles.scss";

export const EndOfResults = ({ onClick, active = true }: Props) => {
  return (
    <div
      role="alert"
      className="explore-results__end"
      aria-live="polite"
      aria-hidden={!active}>
      <button aria-label="Return to top" onClick={onClick}>
        <div>
          <UpIcon aria-hidden />
        </div>
      </button>
      {active && <p>You&apos;ve reached the end of your search results</p>}
    </div>
  );
};

interface Props {
  active: boolean;
  onClick: Callback;
}
