import {
  KeyboardNavigableList,
  ListItem,
  ListOrientation,
} from "Tools/KeyboardNavigableList";
import { ListBoxEvents, SelectionOrigin, SelectionSet } from "./types";

export class ListBoxController<
  I extends ListItem,
  M extends boolean = false,
> extends KeyboardNavigableList<I, ListBoxEvents<M>> {
  public multiple?: M;
  public shifting = false;
  public holdingControl = false;
  public selections: SelectionSet<M>;
  private static readonly MAPPED_KEYS_COMMON = [
    "A",
    " ",
    "End",
    "Home",
    "Shift",
    "Enter",
    "Control",
  ];
  public readonly MAPPED_KEYS_VERTICAL = new Set([
    ...ListBoxController.MAPPED_KEYS_COMMON,
    "ArrowUp",
    "ArrowDown",
  ]);
  public readonly MAPPED_KEYS_HORIZONTAL = new Set([
    ...ListBoxController.MAPPED_KEYS_COMMON,
    "ArrowLeft",
    "ArrowRight",
  ]);
  constructor(
    selections: SelectionSet<M>,
    multiple?: M,
    orientation: ListOrientation = "vertical",
  ) {
    super(orientation);
    this.multiple = multiple;
    this.selections = selections;
  }

  // @ts-ignore
  public override setScope(
    items: I[],
    selections: SelectionSet<M>,
    orientation: ListOrientation,
  ) {
    this.selections = selections;
    super.setScope(items, orientation);
  }

  public override addKeyBindings() {
    document.addEventListener("keydown", this.onKeyUp);
    super.addKeyBindings();
  }

  public override destroy() {
    super.destroy();
    this.shifting = false;
    this.holdingControl = false;
    document.removeEventListener("keyup", this.onKeyUp);
  }

  public enterControls = () => {
    if (this.active) {
      return;
    }
    this.active = true;
    let index = -1;
    if (this.selections instanceof Set && this.selections.size) {
      const first = Array.from(this.selections)[0];
      index = this.items.findIndex(i => i.id === first);
    } else if (
      typeof this.selections === "string" ||
      typeof this.selections === "number"
    ) {
      index = this.items.findIndex(i => i.id === this.selections);
    }
    if (index === -1) {
      index = 0;
    }
    this.setFocusIndex(index);
    this.addKeyBindings();
  };

  public isMultiple = (
    _: Set<string | number> | string | number | undefined,
  ): _ is Set<string | number> => {
    return this.multiple === true;
  };

  public isSelected(id: string | number, selections = this.selections) {
    if (selections instanceof Set) {
      return selections.has(id);
    }
    return id === selections;
  }

  public toggleSelection = (
    ID: string | number | undefined,
    origin: SelectionOrigin = "keyboard",
  ) => {
    if (typeof ID === "undefined") {
      return;
    }
    if (this.isMultiple(this.selections)) {
      const copy = new Set(this.selections);
      if (copy.has(ID)) {
        copy.delete(ID);
      } else {
        copy.add(ID);
      }
      return this.onSelection(copy as SelectionSet<M>, origin);
    }
    return this.onSelection(
      (ID === this.selections ? undefined : ID) as SelectionSet<M>,
      origin,
    );
  };

  private selectInclusiveRange = (start: number, end: number) => {
    const IDsSelected = [];
    for (let i = start; i <= end; i++) {
      IDsSelected.push(this.items[i].id);
    }
    return this.onSelection(new Set(IDsSelected) as SelectionSet<M>);
  };

  private readonly onKeyUp = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Control":
        this.holdingControl = false;
        return;
      case "Shift":
        this.shifting = false;
        return;
      default:
        return;
    }
  };

  protected readonly onKeyDown = (e: KeyboardEvent) => {
    if (this.getMappedKeys().has(e.key)) {
      e.preventDefault();
    }
    switch (e.key) {
      case "Control": {
        this.holdingControl = true;
        return;
      }
      case "Shift": {
        this.shifting = true;
        return;
      }
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
        if (this.holdingControl && this.shifting && this.multiple) {
          return this.selectInclusiveRange(0, this.focusIndex);
        }
        return this.setFocusIndex(0);
      }
      case "End": {
        if (this.holdingControl && this.shifting && this.multiple) {
          return this.selectInclusiveRange(
            this.focusIndex,
            this.items.length - 1,
          );
        }
        return this.setFocusIndex(this.items.length - 1);
      }
      case " ":
      case "Enter": {
        if (this.shifting && this.multiple) {
          let i = this.focusIndex;
          const IDsSelected = [];
          while (i > -1 && !this.isSelected(this.items[i].id)) {
            IDsSelected.push(this.items[i].id);
            i--;
          }
          return this.onSelection(new Set(IDsSelected) as SelectionSet<M>);
        }
        return this.toggleSelection(this.items[this.focusIndex].id);
      }
      case "A":
        if (this.holdingControl && this.multiple) {
          return this.onSelection(
            new Set(this.items.map(i => i.id)) as SelectionSet<M>,
          );
        }
        return;
    }
  };

  private override focusNext() {
    const next = super.focusNext();
    if (this.shifting && this.multiple) {
      this.toggleSelection(this.items[next].id, "keyboard");
    }
    return next;
  }

  private override focusPrevious() {
    const next = super.focusPrevious();
    if (this.shifting && this.multiple) {
      this.toggleSelection(this.items[next].id);
    }
    return next;
  }

  private onSelection(
    selections: SelectionSet<M>,
    origin: SelectionOrigin = "keyboard",
  ) {
    this.selections = selections;
    this.execute({ event: "selection", data: { selections, origin } });
  }
}
