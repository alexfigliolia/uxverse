import { useMemo } from "react";
import { Propless } from "Types/React";
import "./styles.scss";

export const TagGroup = (_: Propless) => {
  const tags = useMemo(
    () =>
      [
        "Coffee Shop",
        "Cafe",
        "Amazing Coffee & Bites",
        "Best Latte in town",
      ].toSorted((a, b) => a.length - b.length),
    [],
  );
  return (
    <ul className="tag-group" aria-label="Tags">
      {tags.map((tag, i) => (
        <li key={i}>{tag}</li>
      ))}
    </ul>
  );
};
