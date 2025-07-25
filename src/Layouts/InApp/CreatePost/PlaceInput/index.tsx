import {
  ButtonHTMLAttributes,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  UIEvent,
  use,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import { useDebouncer } from "@figliolia/react-hooks";
import { ComboBox, ComboBoxControls } from "Components/ComboBox";
import { LoadingIndicator } from "Components/LoadingIndicator";
import { Rating } from "Components/Rating";
import { usePlacesTextSearch } from "Hooks/usePlacesTextSearch";
import { IPlace } from "PlacesClient";
import { Devices } from "Tools/Devices";
import { CreatePostContext } from "../Context";
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
  const { setPlace } = use(CreatePostContext);
  const controls = useRef<ComboBoxControls | null>(null);
  const { onSearch, results, hasNextPage, fetchNextPage, loading } =
    usePlacesTextSearch<PlaceKeys>({ mask: FIELD_MASK });

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

  const selectPlace = useCallback(
    (id: string, name: string) => {
      setSelectedID(id);
      controls.current?.setInputValue?.(name);
    },
    [controls, setSelectedID],
  );

  const setPlaceAndRefetch = useCallback(
    (id: string, name: string) => {
      selectPlace(id, name);
      onSearch(name);
    },
    [selectPlace, onSearch],
  );

  useImperativeHandle(setPlace, () => setPlaceAndRefetch, [setPlaceAndRefetch]);

  const selectItem = useCallback(
    (id: string | undefined) => {
      if (id === undefined) {
        return setSelectedID(id);
      }
      selectPlace(id, hashedItems[id]?.displayName?.text ?? "");
    },
    [selectPlace, hashedItems, setSelectedID],
  );

  const onListBoxSelect = useCallback(
    (id: string | number | undefined) => {
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

  const classes = useClassNames("post-input", "place-input", {
    "on-mobile": Devices.IS_MOBILE,
  });

  return (
    <ComboBox
      type="text"
      name="place"
      ref={controls}
      multiple={false}
      className={classes}
      onChange={onChange}
      renderItem={renderItem}
      selections={selectedID}
      onSelect={onListBoxSelect}
      onScroll={onListBoxScroll}
      items={results as PlaceProps[]}
      placeholder="Place or Venue">
      {/* TODO - test on screen reader */}
      <LoadingIndicator
        loading={loading}
        ariaLabel="Loading more suggestions from google"
      />
    </ComboBox>
  );
};

interface Props {
  selectedID: string | undefined;
  setSelectedID: Dispatch<SetStateAction<string | undefined>>;
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
