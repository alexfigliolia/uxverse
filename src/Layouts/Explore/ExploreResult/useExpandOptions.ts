import { useMemo } from "react";
import { useShareAPI } from "Hooks/useShareAPI";
import { HappyFace } from "Icons/Faces";
import { GlobeIcon } from "Icons/Globe";
import { GoogleMono } from "Icons/Google";
import { NavigationIcon } from "Icons/Navigation";
import { SocialShare } from "Icons/SocialShare";
import { ResultOption } from "../ResultOptions";
import { FormattedPlace } from "../SearchExperience/useExploreData";

export const useExpandOptions = ({
  id,
  website,
  directionsURL,
  reviewsURL,
  googleURL,
}: Pick<
  FormattedPlace,
  | "id"
  | "website"
  | "reviewSummary"
  | "googleURL"
  | "reviewsURL"
  | "directionsURL"
>): ResultOption[] => {
  const shareData = useMemo(
    () => ({
      title: `Checkout this place I found on visitor`,
      url: `${process.env.NEXT_PUBLIC_URL}/explore/${id}`,
    }),
    [id],
  );

  const shareLink = useShareAPI(shareData);

  return useMemo(
    () => [
      ...(website
        ? [
            {
              id: 1,
              label: "Visit Website",
              url: website,
              Icon: GlobeIcon,
            },
          ]
        : []),
      {
        id: 2,
        label: "Get Directions",
        url: directionsURL,
        Icon: NavigationIcon,
      },
      {
        id: 3,
        label: "See Reviews",
        url: reviewsURL,
        Icon: HappyFace,
      },
      {
        id: 4,
        label: "View on Google",
        url: googleURL,
        Icon: GoogleMono,
      },
      {
        id: 5,
        label: "Share this Place",
        Icon: SocialShare,
        onClick: shareLink,
      },
    ],
    [website, googleURL, reviewsURL, directionsURL, shareLink],
  ) as ResultOption[];
};
