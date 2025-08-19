import {
  KeyboardListFocusEvent,
  KeyboardNavigableList,
  ListItem,
  ListOrientation,
} from "Tools/KeyboardNavigableList";

export class MenuController<I extends ListItem> extends KeyboardNavigableList<
  I,
  KeyboardListFocusEvent
> {
  private static readonly MAPPED_KEYS_COMMON = [" ", "End", "Home", "Enter"];
  public readonly MAPPED_KEYS_VERTICAL = new Set([
    ...MenuController.MAPPED_KEYS_COMMON,
    "ArrowUp",
    "ArrowDown",
  ]);
  public readonly MAPPED_KEYS_HORIZONTAL = new Set([
    ...MenuController.MAPPED_KEYS_COMMON,
    "ArrowLeft",
    "ArrowRight",
  ]);

  public enterControls = () => {
    if (this.active) {
      return;
    }
    this.active = true;
    this.setFocusIndex(0);
    this.addKeyBindings();
  };

  public setScope(items: I[], orientation: ListOrientation) {
    this.items = items;
    this.orientation = orientation;
    this.reorientFocusIndex();
  }

  protected readonly onKeyDown = (e: KeyboardEvent) => {
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
}
