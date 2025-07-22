import {
  ButtonHTMLAttributes,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  UIEvent,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useDebouncer } from "@figliolia/react-hooks";
import { ComboBox, ComboBoxControls } from "Components/ComboBox";
import { Rating } from "Components/Rating";
import { Spinner } from "Components/Spinner";
import { VisuallyHiddenText } from "Components/VisuallyHiddenText";
import { usePlacesTextSearch } from "Hooks/usePlacesTextSearch";
import { IPlace } from "PlacesClient";
import "./styles.scss";

type PlaceKeys =
  | "id"
  | "displayName"
  | "rating"
  | "formattedAddress"
  | "shortFormattedAddress";

const FIELD_MASK =
  "places.id,places.displayName.text,places.rating,places.formattedAddress,places.shortFormattedAddress";

export const PlaceInput = ({ selectedID, setSelectedID }: Props) => {
  const controls = useRef<ComboBoxControls | null>(null);
  const { onSearch, results, hasNextPage, fetchNextPage, loading } =
    usePlacesTextSearch<PlaceKeys>(FIELD_MASK);

  const hashedItems = useMemo(
    () =>
      results.reduce(
        (acc, next) => {
          if (typeof next.id === "string") {
            // @ts-ignore
            acc[next.id] = next;
          }
          return acc;
        },
        {} as Record<string, PlaceProps>,
      ),
    [results],
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onSearch(e.target.value);
    },
    [onSearch],
  );

  const selectItem = useCallback(
    (id: string) => {
      setSelectedID(id);
      controls.current?.setInputValue?.(
        hashedItems[id]?.displayName?.text ?? "",
      );
    },
    [hashedItems, setSelectedID],
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

  const onScroll = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      const listbox = e.target as HTMLDivElement;
      if (
        hasNextPage &&
        listbox.scrollTop > listbox.scrollHeight - listbox.clientHeight - 50
      ) {
        fetchNextPage();
      }
    },
    [hasNextPage, fetchNextPage],
  );

  const debouncer = useDebouncer(onScroll, 250);

  const onListBoxScroll = useMemo(
    () => (hasNextPage ? debouncer.execute : undefined),
    [hasNextPage, debouncer],
  );

  const renderItem = useCallback(
    (item: PlaceProps) => <Option key={item.id} tabIndex={-1} {...item} />,
    [],
  );

  return (
    <ComboBox
      type="text"
      name="place"
      ref={controls}
      multiple={false}
      onChange={onChange}
      renderItem={renderItem}
      selections={selectedID}
      onSelect={onListBoxSelect}
      onScroll={onListBoxScroll}
      items={results as PlaceProps[]}
      className="post-input place-input"
      placeholder="Place or Venue">
      {/* TODO - test on screen reader */}
      <div
        role="status"
        aria-live="polite"
        aria-busy={loading}
        className="loading-indicator">
        <div>
          <Spinner aria-hidden />
        </div>
        <VisuallyHiddenText>
          Loading more suggestions from google
        </VisuallyHiddenText>
      </div>
    </ComboBox>
  );
};

interface Props {
  selectedID: string;
  setSelectedID: Dispatch<SetStateAction<string>>;
}

function Option({
  rating,
  displayName,
  formattedAddress,
  shortFormattedAddress,
  ...rest
}: OptionProps) {
  const userFacingName = useMemo(() => displayName?.text ?? "", [displayName]);

  return (
    <button {...rest}>
      <div className="option-title">
        <span>
          {userFacingName}{" "}
          {typeof rating === "number" && <Rating stars={rating} />}
        </span>
      </div>
      <address>
        {shortFormattedAddress && shortFormattedAddress !== userFacingName
          ? shortFormattedAddress
          : formattedAddress}
      </address>
    </button>
  );
}

type PlaceProps = Omit<Pick<IPlace, PlaceKeys>, "id"> & {
  id: string;
};

type OptionProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "id" | "onClick"
> &
  PlaceProps;
