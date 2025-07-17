import { useCallback } from "react";
import { useDebouncer } from "@figliolia/react-hooks";
import { Propless } from "Types/React";
import { PostInput } from "../PostInput";
import "./styles.scss";

// google.maps.places.Place[]

export const PlaceInput = (_: Propless) => {
  // https://places.googleapis.com/v1/places:searchText

  const googleSearch = useCallback(() => {
    void fetch(
      `https://content-places.googleapis.com/v1/places:searchText?fields=*&alt=json&key=${process.env.NEXT_PUBLIC_MAPS_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          textQuery: "Rosas Pizza",
        }),
      },
    )
      .then(res => res.json())
      .then(console.log)
      .catch(console.log);
  }, []);

  const debouncer = useDebouncer(googleSearch, 500);

  const search = useCallback(() => {
    debouncer.execute();
  }, [debouncer]);

  return (
    <PostInput className="place-input">
      <input
        type="text"
        name="place"
        placeholder="Place or Venue (optional)"
        onChange={search}
      />
    </PostInput>
  );
};
