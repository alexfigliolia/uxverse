import { ChangeEvent, useCallback, useEffect, useMemo, useRef } from "react";
import { useDebouncer } from "@figliolia/react-hooks";
import { usePlacesTextSearch } from "Hooks/usePlacesTextSearch";
import { WarningFilled } from "Icons/Warning";
import { Callback } from "Types/Generics";
import { Propless } from "Types/React";
import { ExploreAlert } from "../ExploreAlert";
import { ExploreResult } from "../ExploreResult";
import { SearchInput } from "../SearchInput";
import {
  FIELD_MASK,
  PlaceKeys,
  SKELETON_DATA,
  useExploreData,
} from "./useExploreData";
import "./styles.scss";

export const SearchExperience = (_: Propless) => {
  const focusInput = useRef<Callback>(null);
  const { results, onSearch, loading, error, hasNextPage, fetchNextPage } =
    usePlacesTextSearch<PlaceKeys>(
      FIELD_MASK,
      "attractions or food near me",
      true,
    );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onSearch(e.target.value);
    },
    [onSearch],
  );

  const places = useExploreData(results);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    focusInput.current?.();
  }, []);

  const onScroll = useCallback(() => {
    if (
      window.scrollY + window.innerHeight >
      document.documentElement.scrollHeight - 100
    ) {
      fetchNextPage();
    }
  }, [fetchNextPage]);

  const debouncer = useDebouncer(onScroll, 200);

  useEffect(() => {
    if (hasNextPage) {
      window.addEventListener("scroll", debouncer.execute);
    } else {
      window.removeEventListener("scroll", debouncer.execute);
    }
    return () => {
      window.removeEventListener("scroll", debouncer.execute);
    };
  }, [debouncer, hasNextPage]);

  const renderablePlaces = useMemo(
    () => (loading ? [...places, ...SKELETON_DATA] : places),
    [places, loading],
  );

  return (
    <div className="explore-search-experience">
      <div>
        <search>
          <SearchInput ref={focusInput} onChange={onChange} />
        </search>
        <section className="explore-search-experience__results">
          {renderablePlaces.map((result, i) => {
            if (result.id) {
              return <ExploreResult key={i} {...result} />;
            }
          })}
        </section>
        <div className="explore-search-experience__alerts">
          <ExploreAlert
            onClick={scrollToTop}
            active={!error && !hasNextPage && !!results.length}
          />
          <ExploreAlert
            onClick={scrollToTop}
            active={!error && !hasNextPage && !!results.length}
          />
          <ExploreAlert
            onClick={scrollToTop}
            active={!error && !loading && !results.length}
            text="There are no results matching your search"
          />
          <ExploreAlert
            onClick={scrollToTop}
            Icon={WarningFilled}
            active={error === "NETWORK_ERROR"}
            text="It appears your connection may be a little weak. Please try again"
          />
        </div>
      </div>
    </div>
  );
};
