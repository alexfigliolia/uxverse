import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { Position } from "Components/GoogleMap";
import { RoundLocationPin } from "Icons/RoundLocationPin";
import Theme from "Styles/Exports.module.scss";

export const AvatarMarker = ({ position, currentUser }: Props) => {
  return (
    <AdvancedMarker position={position}>
      <div
        style={{
          padding: 4,
          position: "relative",
          translate: "0, -30%",
          background: currentUser
            ? `linear-gradient(to bottom right, ${Theme.orange}, ${Theme.red})`
            : "#fff",
          borderRadius: "50%",
          boxShadow:
            "0em 0.05em 0.25em rgba(0,0,0, 0.25), 0em 0.1em 0.2em rgba(0,0,0, 0.15)",
        }}>
        <RoundLocationPin
          aria-hidden
          style={{
            zIndex: 1,
            position: "absolute",
            top: "-5%",
            left: "-15%",
            width: "130%",
            height: "130%",
            fill: currentUser ? "url(#themeGradient)" : "#fff",
            filter: "drop-shadow(0em 0.2em 0.3em rgba(0,0,0, 0.25))",
          }}
        />
        <div
          style={{
            width: 45,
            height: 45,
            position: "relative",
            zIndex: 2,
            overflow: "hidden",
            borderRadius: "50%",
            boxShadow: currentUser
              ? "0em 0.1em 0.2em rgba(255,255,255, 0.5)"
              : "0em 0.1em 0.2em rgba(0,0,0, 0.5)",
          }}>
          <img
            src="/profile.jpg"
            alt="user-avatar"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </AdvancedMarker>
  );
};

interface Props {
  position: Position;
  currentUser?: boolean;
}
