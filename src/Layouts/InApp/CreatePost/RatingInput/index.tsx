import {
  ButtonHTMLAttributes,
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import { ComboBox, ComboBoxControls } from "Components/ComboBox";
import { SelectionSet } from "Components/ListBox";
import { VisuallyHiddenText } from "Components/VisuallyHiddenText";
import {
  DisappointedFace,
  ExcitedFace,
  HappyFace,
  NeutralFace,
  SadFace,
} from "Icons/Faces";
import { StarFilled } from "Icons/Star";
import { Devices } from "Tools/Devices";
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
    (id: string | undefined) => {
      setSelectedID(current => {
        if (current === id || id === undefined) {
          controls?.current?.setInputValue("");
          return;
        }
        controls?.current?.setInputValue(
          RATING_OPTIONS.find(f => f.id === id)?.ariaLabel ?? "",
        );
        return id;
      });
    },
    [setSelectedID],
  );

  const onListBoxSelect = useCallback(
    (id: SelectionSet<false>) => {
      if (typeof id === "number") {
        return;
      }
      selectItem(id);
    },
    [selectItem],
  );

  const renderItem = useCallback(
    (item: (typeof RATING_OPTIONS)[number]) => (
      <Option key={item.id} tabIndex={-1} {...item} />
    ),
    [],
  );

  const classes = useClassNames("post-input rating-input", {
    "on-mobile": Devices.IS_MOBILE,
  });

  return (
    <ComboBox
      type="text"
      name="rating"
      readonlyInput
      ref={controls}
      multiple={false}
      className={classes}
      autoComplete="none"
      items={RATING_OPTIONS}
      renderItem={renderItem}
      selections={selectedID}
      orientation="horizontal"
      onSelect={onListBoxSelect}
      placeholder="How would you rate your experience?"
    />
  );
};

interface Props {
  selectedID: string | undefined;
  setSelectedID: Dispatch<SetStateAction<string | undefined>>;
}

function Option({ Face, ariaLabel, animate, ...rest }: OptionProps) {
  return (
    <button data-animate={animate} {...rest}>
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
> &
  (typeof RATING_OPTIONS)[number];
