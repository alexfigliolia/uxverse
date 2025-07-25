import { ChangeEvent, useCallback, useEffect, useRef } from "react";
import { useDebouncer } from "@figliolia/react-hooks";
import { usePlacesTextSearch } from "Hooks/usePlacesTextSearch";
import { Callback } from "Types/Generics";
import { Propless } from "Types/React";
import { EndOfResults } from "../EndOfResults";
import { ExploreResult } from "../ExploreResult";
import { SearchInput } from "../SearchInput";
import { FIELD_MASK, PlaceKeys, useExploreData } from "./useExploreData";
import "./styles.scss";

export const SearchExperience = (_: Propless) => {
  const focusInput = useRef<Callback>(null);
  const { results, onSearch, loading, hasNextPage, fetchNextPage } =
    usePlacesTextSearch<PlaceKeys>(FIELD_MASK, "attractions or food near me");

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

  return (
    <div className="explore-search-experience">
      <div>
        <search>
          <SearchInput ref={focusInput} onChange={onChange} />
        </search>
        <section className="explore-search-experience__results">
          {places.map(result => {
            if (result.id) {
              return <ExploreResult key={result.id} {...result} />;
            }
          })}
          {!hasNextPage && !!results.length && (
            <EndOfResults active onClick={scrollToTop} />
          )}
        </section>
      </div>
    </div>
  );
};
