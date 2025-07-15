import { RefObject } from "react";
import { BannerComponent } from "Layouts/Profile/Banners";
import "./styles.scss";

export const BannerSection = ({ Banner, ref }: Props) => {
  return (
    <div className="profile-page__banner">
      <div>
        <Banner ref={ref} />
      </div>
    </div>
  );
};

interface Props {
  Banner: BannerComponent;
  ref: RefObject<HTMLImageElement | null>;
}
