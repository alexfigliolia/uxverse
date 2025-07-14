import Link from "next/link";
import { FacebookColored } from "Icons/Facebook";
import { InstagramColored } from "Icons/Instagram";
import { TiktokColored } from "Icons/Tiktok";
import { YoutubeIcon } from "Icons/Youtube";
import { SocialURLs } from "Tools/SocialURLs";
import { Propless } from "Types/React";
import "./styles.scss";

export const UserSocialLinks = (_: Propless) => {
  return (
    <div className="user-social-links">
      <Link
        target="_blank"
        aria-label="Visit Erica Figliolia's Instagram"
        href={SocialURLs.instagramProfile("something")}>
        <InstagramColored />
      </Link>
      <Link
        target="_blank"
        aria-label="Visit Erica Figliolia's Tiktok"
        href={SocialURLs.tiktokProfile("something")}>
        <TiktokColored />
      </Link>
      <Link
        target="_blank"
        aria-label="Visit Erica Figliolia's Facebook"
        href="https://facebook.com/something">
        <FacebookColored />
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
