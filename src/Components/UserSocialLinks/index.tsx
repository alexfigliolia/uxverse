import { FacebookColored, FacebookFilled } from "Icons/Facebook";
import { InstagramColored, InstagramStroked } from "Icons/Instagram";
import { TiktokColored, TiktokStroked } from "Icons/Tiktok";
import { YoutubeIcon } from "Icons/Youtube";
import { SocialURLs } from "Tools/SocialURLs";
import { Propless } from "Types/React";
import "./styles.scss";

export const UserSocialLinks = (_: Propless) => {
  return (
    <div className="user-social-links">
      <a
        target="_blank"
        aria-label="Visit Erica Figliolia's Instagram"
        href={SocialURLs.instagramProfile("something")}>
        <InstagramStroked />
        <InstagramColored />
      </a>
      <a
        target="_blank"
        aria-label="Visit Erica Figliolia's Tiktok"
        href={SocialURLs.tiktokProfile("something")}>
        <TiktokStroked />
        <TiktokColored />
      </a>
      <a
        target="_blank"
        aria-label="Visit Erica Figliolia's Facebook"
        href="https://facebook.com/something">
        <FacebookFilled />
        <FacebookColored />
      </a>
      <a
        target="_blank"
        aria-label="Visit Erica Figliolia's Youtube Channel"
        href={SocialURLs.youtubeChannel("something")}>
        <YoutubeIcon className="gray" />
        <YoutubeIcon className="red" />
      </a>
    </div>
  );
};
