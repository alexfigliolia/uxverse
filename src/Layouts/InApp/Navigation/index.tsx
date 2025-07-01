"use client";
import { IconLink } from "Components/IconLink";
import { BellFilled, BellStroked } from "Icons/Bell";
import { CameraIcon } from "Icons/Camera";
import { FeedFilled, FeedStroked } from "Icons/Feed";
import { LocationFilled, LocationStroked } from "Icons/Location";
import { UserFilled, UserStroked } from "Icons/User";
import { Propless } from "Types/React";
import "./styles.scss";

export const Navigation = (_: Propless) => {
  return (
    <nav className="in-app-nav">
      <ul>
        <li>
          <IconLink
            href="/feed"
            label="Feed"
            IconStroked={FeedStroked}
            IconFilled={FeedFilled}
          />
        </li>
        <li>
          <IconLink
            href="/explore"
            label="Explore"
            IconStroked={LocationStroked}
            IconFilled={LocationFilled}
          />
        </li>
        <li>
          <button className="create-button" aria-label="New Post">
            <CameraIcon aria-hidden />
          </button>
        </li>
        <li>
          <IconLink
            href="/profile"
            label="Profile"
            IconStroked={UserStroked}
            IconFilled={UserFilled}
          />
        </li>
        <li>
          <IconLink
            href="/notifications"
            label="noties"
            IconStroked={BellStroked}
            IconFilled={BellFilled}
          />
        </li>
      </ul>
    </nav>
  );
};
