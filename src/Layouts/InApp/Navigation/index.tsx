"use client";
import { use } from "react";
import { IconLink } from "Components/IconLink";
import { BellFilled, BellStroked } from "Icons/Bell";
import { CameraIcon } from "Icons/Camera";
import { FeedFilled, FeedStroked } from "Icons/Feed";
import { LocationFilled, LocationStroked } from "Icons/Location";
import { UserFilled, UserStroked } from "Icons/User";
import { Propless } from "Types/React";
import { CreatePostContext } from "../CreatePost";
import "./styles.scss";

export const Navigation = (_: Propless) => {
  const { toggle } = use(CreatePostContext);
  return (
    <nav className="in-app-nav">
      <ul>
        <li>
          <IconLink
            href="/feed"
            ariaLabel="Navigate to the Feed page"
            IconStroked={FeedStroked}
            IconFilled={FeedFilled}
          />
        </li>
        <li>
          <IconLink
            href="/explore"
            ariaLabel="Navigate to the Explore page"
            IconStroked={LocationStroked}
            IconFilled={LocationFilled}
          />
        </li>
        <li>
          <button
            className="create-button"
            aria-label="Create a new post"
            onClick={toggle.open}>
            <CameraIcon aria-hidden />
          </button>
        </li>
        <li>
          <IconLink
            href="/profile"
            ariaLabel="Navigate to your Profile"
            IconStroked={UserStroked}
            IconFilled={UserFilled}
          />
        </li>
        <li>
          <IconLink
            href="/notifications"
            ariaLabel="noties"
            IconStroked={BellStroked}
            IconFilled={BellFilled}
          />
        </li>
      </ul>
    </nav>
  );
};
