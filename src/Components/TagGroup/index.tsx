import { useMemo } from "react";
import "./styles.scss";

export const TagGroup = ({ tags }: Props) => {
  const sorted = useMemo(
    () => tags.toSorted((a, b) => a.length - b.length),
    [tags],
  );
  return (
    <ul className="tag-group" aria-label="Tags">
      {sorted.map((tag, i) => (
        <li key={i}>{tag}</li>
      ))}
    </ul>
  );
};

interface Props {
  tags: string[];
}
