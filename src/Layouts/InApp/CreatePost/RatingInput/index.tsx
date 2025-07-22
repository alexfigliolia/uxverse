import {
  ButtonHTMLAttributes,
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
} from "react";
import { ComboBox, ComboBoxControls } from "Components/ComboBox";
import { VisuallyHiddenText } from "Components/VisuallyHiddenText";
import {
  DisappointedFace,
  ExcitedFace,
  HappyFace,
  NeutralFace,
  SadFace,
} from "Icons/Faces";
import { StarFilled } from "Icons/Star";
import { Callback } from "Types/Generics";
import "./styles.scss";

const RATING_OPTIONS = [
  {
    id: "1",
    ariaLabel: "Disappointing experience",
    Face: DisappointedFace,
  },
  {
    id: "2",
    ariaLabel: "Not so great experience",
    Face: SadFace,
  },
  {
    id: "3",
    ariaLabel: "Neutral experience",
    Face: NeutralFace,
  },
  {
    id: "4",
    ariaLabel: "Good experience",
    Face: HappyFace,
    animate: true,
  },
  {
    id: "5",
    ariaLabel: "Great experience",
    Face: ExcitedFace,
    animate: true,
  },
];

export const RatingInput = ({ selectedID, setSelectedID }: Props) => {
  const controls = useRef<ComboBoxControls | null>(null);

  const selectItem = useCallback(
    (id: string) => {
      setSelectedID(id);
      controls?.current?.setInputValue(
        RATING_OPTIONS.find(f => f.id === id)?.ariaLabel ?? "",
      );
    },
    [setSelectedID],
  );

  const onListBoxSelect = useCallback(
    (id: string | number) => {
      if (typeof id === "number") {
        return;
      }
      selectItem(id);
    },
    [selectItem],
  );

  const renderItem = useCallback(
    (item: (typeof RATING_OPTIONS)[number]) => (
      <Option key={item.id} tabIndex={-1} onSelected={selectItem} {...item} />
    ),
    [selectItem],
  );

  return (
    <ComboBox
      type="text"
      name="rating"
      readonlyInput
      ref={controls}
      multiple={false}
      autoComplete="none"
      items={RATING_OPTIONS}
      renderItem={renderItem}
      selections={selectedID}
      orientation="horizontal"
      onSelect={onListBoxSelect}
      className="post-input rating-input"
      placeholder="How would you rate your experience?"
    />
  );
};

interface Props {
  selectedID: string;
  setSelectedID: Dispatch<SetStateAction<string>>;
}

function Option({
  id,
  Face,
  ariaLabel,
  onSelected,
  animate,
  ...rest
}: OptionProps) {
  const onClick = useCallback(() => {
    onSelected(id);
  }, [onSelected, id]);

  return (
    <button onClick={onClick} data-animate={animate} {...rest}>
      <div className="stars">
        <StarFilled />
        <StarFilled />
      </div>
      <Face aria-hidden />
      <VisuallyHiddenText Tag="span">{ariaLabel}</VisuallyHiddenText>
      {animate && (
        <div aria-hidden className="twinkle">
          <div />
          <div />
          <div />
          <div />
        </div>
      )}
    </button>
  );
}

type OptionProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "id" | "onClick" | "aria-label"
> & {
  onSelected: Callback<[string]>;
} & (typeof RATING_OPTIONS)[number];
