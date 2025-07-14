"use client";
import { useEffect, useRef, useState } from "react";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { UserSocialLinks } from "Components/SocialLinks";
import { OptionalChildren } from "Types/React";
import "./styles.scss";

export const ProfileBio = ({ children }: OptionalChildren) => {
  const [pHeight, setPHeight] = useState<number>();
  const paragraph = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (paragraph.current) {
      setPHeight(paragraph.current.scrollHeight);
    }
  }, []);

  return (
    <div className="profile-bio">
      <div className="profile-bio__user">
        <div>
          <ReducedLetterSpacing Tag="h1">Erica Figliolia</ReducedLetterSpacing>
          <ReducedLetterSpacing Tag="span">
            @ericafigliolia
          </ReducedLetterSpacing>
          <UserSocialLinks />
        </div>
      </div>
      <p
        ref={paragraph}
        style={{ "--max-height": pHeight ? `${pHeight}px` : undefined }}>
        A profile bio about things and stuff. With more text about things and
        stuff and things
        <br />
        <br />
        <a>Behind The Matches</a>
      </p>
      {children}
    </div>
  );
};
