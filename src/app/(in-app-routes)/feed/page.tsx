import { BoundedContent } from "Components/BoundedContent";
import { Post } from "Layouts/Feed";
import { Propless } from "Types/React";
import "./styles.scss";

export default function Feed(_: Propless) {
  return (
    <BoundedContent Tag="section" className="feed-content">
      <Post />
      <Post />
      <Post />
    </BoundedContent>
  );
}
