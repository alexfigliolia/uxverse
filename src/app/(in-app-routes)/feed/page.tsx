import { Fragment } from "react";
import { BoundedContent } from "Components/BoundedContent";
import { Header, Post } from "Layouts/Feed";
import { Propless } from "Types/React";
import "./styles.scss";

export default function Feed(_: Propless) {
  return (
    <Fragment>
      <Header />
      <BoundedContent Tag="section" className="feed-content">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </BoundedContent>
    </Fragment>
  );
}
