import { Avatar } from "Components/Avatar";
import { Propless } from "Types/React";
import "./styles.scss";

export const ActivePeople = (_: Propless) => {
  return (
    <div className="active-people">
      <Avatar active />
      <Avatar active />
      <Avatar active />
      <Avatar />
      <Avatar />
      <Avatar />
      <Avatar />
      <Avatar />
      <Avatar />
      <Avatar />
      <Avatar />
      <Avatar />
      <Avatar />
      <Avatar />
      <Avatar />
      <Avatar />
    </div>
  );
};
