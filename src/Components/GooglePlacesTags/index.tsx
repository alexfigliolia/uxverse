"use client";
import { Fragment, useCallback, useMemo, useState } from "react";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { TagGroup } from "Components/TagGroup";
import { X } from "Icons/X";
import "./styles.scss";

const TAG_BLACK_LIST = new Set<string>([
  "point_of_interest",
  "establishment",
  "restaurant",
  "food",
  "store",
]);

export const GooglePlacesTags = ({ tags, windowSize = 4 }: Props) => {
  const userFacingTags = useMemo(() => {
    const userFacingTags: string[] = [];
    for (const tag of tags) {
      if (!TAG_BLACK_LIST.has(tag)) {
        let userFacingTag = tag;
        if (userFacingTag.endsWith("_restaurant")) {
          userFacingTag = userFacingTag.replace("_restaurant", "");
        }
        userFacingTag = userFacingTag.replaceAll("_", " ");
        userFacingTags.push(userFacingTag);
      }
    }
    userFacingTags.sort((a, b) => a.length - b.length);
    return userFacingTags;
  }, [tags]);

  const hasOverflow = useMemo(
    () => userFacingTags.length > windowSize,
    [userFacingTags, windowSize],
  );
  const [expanded, setExpanded] = useState(!hasOverflow);

  const toggle = useCallback(() => {
    setExpanded(c => !c);
  }, []);

  const visibleTags = useMemo(
    () => (expanded ? userFacingTags : userFacingTags.slice(0, windowSize)),
    [expanded, userFacingTags, windowSize],
  );

  if (!visibleTags.length) {
    return null;
  }

  return (
    <TagGroup tags={visibleTags} className="google-places-tags">
      {hasOverflow && (
        <button onClick={toggle}>
          <ReducedLetterSpacing Tag="span">
            {expanded ? (
              <Fragment>
                <X />
                Collapse
              </Fragment>
            ) : (
              `${userFacingTags.length - windowSize} more`
            )}
          </ReducedLetterSpacing>
        </button>
      )}
    </TagGroup>
  );
};

interface Props {
  tags: string[];
  windowSize?: number;
}
