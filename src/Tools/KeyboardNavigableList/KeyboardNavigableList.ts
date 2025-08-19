import { Subscriptable } from "@figliolia/event-emitter";
import { Callback } from "Types/Generics";
import {
  BaseEvent,
  KeyboardListFocusEvent,
  ListItem,
  ListOrientation,
} from "./types";

export abstract class KeyboardNavigableList<
  I extends ListItem,
  E extends BaseEvent = BaseEvent,
> extends Subscriptable<Callback<[E | KeyboardListFocusEvent]>> {
  public active = false;
  public items: I[] = [];
  public focusIndex = -1;
  public nodeIds: string[] = [];
  public orientation: ListOrientation;
  public abstract readonly enterControls: Callback;
  public abstract readonly MAPPED_KEYS_VERTICAL: Set<string>;
  public abstract readonly MAPPED_KEYS_HORIZONTAL: Set<string>;
  protected abstract readonly onKeyDown: Callback<[e: KeyboardEvent]>;
  constructor(orientation: ListOrientation = "vertical") {
    super();
    this.orientation = orientation;
  }

  public isActive = () => {
    return this.active;
  };

  public getFocusIndex = () => {
    return this.focusIndex;
  };

  public getMappedKeys() {
    return this.orientation === "horizontal"
      ? this.MAPPED_KEYS_HORIZONTAL
      : this.MAPPED_KEYS_VERTICAL;
  }

  public cacheRef(index: number) {
    return (id: string | null) => {
      if (id !== null) {
        this.nodeIds[index] = id;
      }
    };
  }

  public abstract setScope(items: I[], ...args: any[]): void;

  public addKeyBindings() {
    document.addEventListener("keydown", this.onKeyDown);
  }

  public destroy() {
    this.active = false;
    this.resetFocusIndex();
    document.removeEventListener("keydown", this.onKeyDown);
  }

  public enterAtIndex(index: number) {
    this.active = true;
    this.setFocusIndex(index, false);
    this.addKeyBindings();
  }

  public resetFocusIndex = () => {
    if (this.focusIndex >= 0) {
      this.setFocusIndex(-1);
    }
  };

  protected reorientFocusIndex() {
    if (this.focusIndex >= this.items.length) {
      this.setFocusIndex(0);
    }
  }

  protected focusNext() {
    const next =
      this.focusIndex + 1 >= this.items.length ? 0 : this.focusIndex + 1;
    this.setFocusIndex(next);
    return next;
  }

  protected focusPrevious() {
    const next =
      this.focusIndex - 1 < 0 ? this.items.length - 1 : this.focusIndex - 1;
    this.setFocusIndex(next);
    return next;
  }

  protected setFocusIndex(index: number, scrollTo = true) {
    this.focusIndex = index;
    this.execute({
      event: "focus",
      data: { index, nodeID: this.nodeIds[index], scrollTo },
    });
  }
}
