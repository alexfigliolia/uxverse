import { ScreenReaderOnly } from "Components/ScreenReaderOnly";
import { Spinner } from "Components/Spinner";
import "./styles.scss";

export const LoadingIndicator = ({ loading, ariaLabel }: Props) => {
  return (
    <div
      aria-atomic
      role="status"
      aria-live="polite"
      aria-busy={loading}
      className="loading-indicator">
      <div>
        <Spinner aria-hidden />
      </div>
      {loading && <ScreenReaderOnly Tag="span">{ariaLabel}</ScreenReaderOnly>}
    </div>
  );
};

interface Props {
  loading: boolean;
  ariaLabel: string;
}
