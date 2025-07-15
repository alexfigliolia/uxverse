import Link from "next/link";
import { FacebookFilled } from "Icons/Facebook";
import { InstagramStroked } from "Icons/Instagram";
import { TiktokStroked } from "Icons/Tiktok";
import { YoutubeIcon } from "Icons/Youtube";
import { SocialURLs } from "Tools/SocialURLs";
import { Propless } from "Types/React";
import "./styles.scss";

export const UserSocialLinksGray = (_: Propless) => {
  return (
    <div className="user-social-links-gray">
      <Link
        target="_blank"
        aria-label="Visit Erica Figliolia's Instagram"
        href={SocialURLs.instagramProfile("something")}>
        <InstagramStroked />
      </Link>
      <Link
        target="_blank"
        aria-label="Visit Erica Figliolia's Tiktok"
        href={SocialURLs.tiktokProfile("something")}>
        <TiktokStroked />
      </Link>
      <Link
        target="_blank"
        aria-label="Visit Erica Figliolia's Facebook"
        href="https://facebook.com/something">
        <FacebookFilled />
      </Link>
      <Link
        target="_blank"
        aria-label="Visit Erica Figliolia's Youtube Channel"
        href={SocialURLs.youtubeChannel("something")}>
        <YoutubeIcon />
      </Link>
    </div>
  );
};
