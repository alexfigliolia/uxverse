import { Dispatch, RefCallback, RefObject, SetStateAction } from "react";
import { Callback } from "Types/Generics";
import { OptionalChildren } from "Types/React";
import { KeyboardNavigableList } from "./KeyboardNavigableList";

export interface KeyboardListFocusEvent {
  event: "focus";
  data: {
    index: number;
    nodeID: string | undefined;
    scrollTo: boolean;
  };
}

export interface BaseEvent {
  event: string;
  data: Record<string, any>;
}

export type ListOrientation = "horizontal" | "vertical";

export interface ListItem {
  id: string | number;
}

export type ListElement<T extends "ul" | "ol"> = T extends "ul"
  ? HTMLUListElement
  : HTMLOListElement;

export interface IContext<
  T extends KeyboardNavigableList<any, any> = KeyboardNavigableList<any, any>,
> {
  controller: T;
  focusInside: boolean;
  focusedID: string | undefined;
  focusedIndex: number;
  setFocusInside: Dispatch<SetStateAction<boolean>>;
  queueTask: Callback<[Callback]>;
  listElement: RefObject<ListElement<any> | null>;
}

export interface KeyboardNavigableListControls {
  exit: Callback;
  enter: Callback;
  resetFocusIndex: Callback;
  isActive: Callback<never[], boolean>;
  getFocusIndex: Callback<never[], number>;
}

export interface IProviderProps<
  M extends KeyboardNavigableList<any, any> = KeyboardNavigableList<any, any>,
> extends OptionalChildren {
  setScope: Callback<[M]>;
  createInstance: Callback<never[], M>;
  controllerRef: KeyboardControllerRef;
}

export type KeyboardControllerRef =
  | RefObject<KeyboardNavigableListControls | null>
  | RefCallback<KeyboardNavigableListControls | null>;
