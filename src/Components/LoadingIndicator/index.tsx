import { Spinner } from "Components/Spinner";
import { VisuallyHiddenText } from "Components/VisuallyHiddenText";
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
      {loading && <VisuallyHiddenText>{ariaLabel}</VisuallyHiddenText>}
    </div>
  );
};

interface Props {
  loading: boolean;
  ariaLabel: string;
}
