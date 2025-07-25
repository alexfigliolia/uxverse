import { Subscriptable } from "@figliolia/event-emitter";
import {
  ListBoxFocusEvent,
  ListBoxItem,
  ListBoxOrientation,
} from "Components/ListBox";
import { Callback } from "Types/Generics";

export class MenuController<I extends ListBoxItem> extends Subscriptable<
  Callback<[ListBoxFocusEvent]>
> {
  public active = false;
  public items: I[] = [];
  public focusIndex = -1;
  public nodeIds: string[] = [];
  public orientation: ListBoxOrientation;
  private static readonly MAPPED_KEYS_COMMON = [" ", "End", "Home", "Enter"];
  public static readonly MAPPED_KEYS_VERTICAL = new Set([
    ...this.MAPPED_KEYS_COMMON,
    "ArrowUp",
    "ArrowDown",
  ]);
  public static readonly MAPPED_KEYS_HORIZONTAL = new Set([
    ...this.MAPPED_KEYS_COMMON,
    "ArrowLeft",
    "ArrowRight",
  ]);
  constructor(orientation: ListBoxOrientation = "vertical") {
    super();
    this.orientation = orientation;
  }

  public getMappedKeys() {
    return this.orientation === "horizontal"
      ? MenuController.MAPPED_KEYS_HORIZONTAL
      : MenuController.MAPPED_KEYS_VERTICAL;
  }

  public cacheRef(index: number) {
    return (id: string | null) => {
      if (id !== null) {
        this.nodeIds[index] = id;
      }
    };
  }

  public setScope(items: I[], orientation: ListBoxOrientation) {
    this.items = items;
    this.orientation = orientation;
    if (this.focusIndex > this.items.length) {
      this.setFocusIndex(0);
    }
  }

  public addKeyBindings() {
    document.addEventListener("keydown", this.onKeyDown);
  }

  public destroy = () => {
    this.active = false;
    this.resetFocusIndex();
    document.removeEventListener("keydown", this.onKeyDown);
  };

  public enterMenu = () => {
    if (this.active) {
      return;
    }
    this.active = true;
    this.setFocusIndex(0);
    this.addKeyBindings();
  };

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

  private readonly onKeyDown = (e: KeyboardEvent) => {
    if (this.getMappedKeys().has(e.key)) {
      e.preventDefault();
    }
    switch (e.key) {
      case "ArrowRight": {
        if (this.orientation === "vertical") {
          return;
        }
        return this.focusNext();
      }
      case "ArrowLeft": {
        if (this.orientation === "vertical") {
          return;
        }
        return this.focusPrevious();
      }
      case "ArrowDown": {
        if (this.orientation === "horizontal") {
          return;
        }
        return this.focusNext();
      }
      case "ArrowUp": {
        if (this.orientation === "horizontal") {
          return;
        }
        return this.focusPrevious();
      }
      case "Home": {
        return this.setFocusIndex(0);
      }
      case "End": {
        return this.setFocusIndex(this.items.length - 1);
      }
      case " ":
      case "Enter": {
        const nodeID = this.nodeIds[this.focusIndex];
        if (nodeID) {
          const target = document.getElementById(nodeID)?.firstChild;
          if (target instanceof HTMLElement) {
            target.click();
          }
        }
        return;
      }
    }
  };

  private focusNext() {
    const next =
      this.focusIndex + 1 >= this.items.length ? 0 : this.focusIndex + 1;
    return this.setFocusIndex(next);
  }

  private focusPrevious() {
    const next =
      this.focusIndex - 1 < 0 ? this.items.length - 1 : this.focusIndex - 1;
    return this.setFocusIndex(next);
  }

  private setFocusIndex(index: number, scrollTo = true) {
    this.focusIndex = index;
    this.execute({
      event: "focus",
      data: { index, nodeID: this.nodeIds[index], scrollTo },
    });
  }
}
