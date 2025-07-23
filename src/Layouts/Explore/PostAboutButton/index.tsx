import { use, useCallback } from "react";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { CameraIcon } from "Icons/Camera";
import { CreatePostContext } from "Layouts/InApp";
import "./styles.scss";

export const PostAboutButton = ({ placeID, placeName }: Props) => {
  const { toggle, setPlace } = use(CreatePostContext);

  const onClick = useCallback(() => {
    if (!setPlace.current) {
      return;
    }
    setPlace.current(placeID, placeName);
    toggle.open();
  }, [toggle, setPlace, placeID, placeName]);

  return (
    <button onClick={onClick} className="post-about-button">
      <div aria-hidden>
        <CameraIcon />
        <CameraIcon />
      </div>
      <ReducedLetterSpacing Tag="span">
        <span>Create Post</span>
        <span>Create Post</span>
      </ReducedLetterSpacing>
    </button>
  );
};

interface Props {
  placeID: string;
  placeName: string;
}
