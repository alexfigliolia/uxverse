import { Avatar } from "Components/Avatar";
import { Propless } from "Types/React";
import "./styles.scss";

export const ActivePeople = (_: Propless) => {
  return (
    <ul className="active-people" aria-label="Recently Active People">
      <li>
        <Avatar active />
      </li>
      <li>
        <Avatar active />
      </li>
      <li>
        <Avatar active />
      </li>
      <li>
        <Avatar />
      </li>
      <li>
        <Avatar />
      </li>
      <li>
        <Avatar />
      </li>
      <li>
        <Avatar />
      </li>
      <li>
        <Avatar />
      </li>
      <li>
        <Avatar />
      </li>
      <li>
        <Avatar />
      </li>
      <li>
        <Avatar />
      </li>
      <li>
        <Avatar />
      </li>
      <li>
        <Avatar />
      </li>
      <li>
        <Avatar />
      </li>
      <li>
        <Avatar />
      </li>
      <li>
        <Avatar />
      </li>
    </ul>
  );
};
