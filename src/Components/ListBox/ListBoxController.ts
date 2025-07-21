import { Subscriptable } from "@figliolia/event-emitter";
import { Callback } from "Types/Generics";
import { ListBoxEvents, ListBoxItem, SelectionSet } from "./types";

export class ListBoxController<
  I extends ListBoxItem,
  M extends boolean = false,
> extends Subscriptable<Callback<[ListBoxEvents<M>]>> {
  public multiple?: M;
  public active = false;
  public items: I[] = [];
  public focusIndex = -1;
  public shifting = false;
  public holdingControl = false;
  public nodeIds: string[] = [];
  public selections: SelectionSet<M>;

  public static readonly MAPPED_KEYS = new Set([
    "A",
    " ",
    "End",
    "Home",
    "Shift",
    "Enter",
    "Control",
    "ArrowUp",
    "ArrowDown",
  ]);
  constructor(selections: SelectionSet<M>, multiple?: M) {
    super();
    this.multiple = multiple;
    this.selections = selections;
  }

  public cacheRef(index: number) {
    return (id: string | null) => {
      if (id !== null) {
        this.nodeIds[index] = id;
      }
    };
  }

  public setScope(items: I[], selections: SelectionSet<M>) {
    this.items = items;
    this.selections = selections;
    if (this.focusIndex > this.items.length) {
      this.setFocusIndex(0);
    }
  }

  public bind() {
    document.addEventListener("keydown", this.onKeyUp);
    document.addEventListener("keydown", this.onKeyDown);
  }

  public destroy = () => {
    this.active = false;
    this.shifting = false;
    this.holdingControl = false;
    this.resetFocusIndex();
    document.removeEventListener("keydown", this.onKeyUp);
    document.removeEventListener("keydown", this.onKeyDown);
  };

  public enterListBox = () => {
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
    this.bind();
  };

  public resetFocusIndex = () => {
    if (this.focusIndex >= 0) {
      this.setFocusIndex(-1);
    }
  };

  public isMultiple = (
    _: Set<string | number> | string | number,
  ): _ is Set<string | number> => {
    return this.multiple === true;
  };

  public isSelected = (id: string | number) => {
    if (this.selections instanceof Set) {
      return this.selections.has(id);
    }
    return id === this.selections;
  };

  public toggleSelection = (ID: string | number | undefined) => {
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
      return this.onSelection(copy as SelectionSet<M>);
    }
    return this.onSelection(
      (ID === this.selections ? "" : ID) as SelectionSet<M>,
    );
  };

  public selectInclusiveRange = (start: number, end: number) => {
    const IDsSelected = [];
    for (let i = start; i <= end; i++) {
      IDsSelected.push(this.items[i].id);
    }
    return this.onSelection(new Set(IDsSelected) as SelectionSet<M>);
  };

  public readonly onKeyUp = (e: KeyboardEvent) => {
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

  public readonly onKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Control": {
        this.holdingControl = true;
        return;
      }
      case "Shift": {
        this.shifting = true;
        return;
      }
      case "ArrowDown": {
        const next =
          this.focusIndex + 1 >= this.items.length ? 0 : this.focusIndex + 1;
        if (this.shifting && this.multiple) {
          this.toggleSelection(this.items[next].id);
        }
        return this.setFocusIndex(next);
      }
      case "ArrowUp": {
        const next =
          this.focusIndex - 1 < 0 ? this.items.length - 1 : this.focusIndex - 1;
        if (this.shifting && this.multiple) {
          this.toggleSelection(this.items[next].id);
        }
        return this.setFocusIndex(next);
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

  private setFocusIndex(index: number) {
    this.focusIndex = index;
    this.execute({
      event: "focus",
      data: { index, nodeID: this.nodeIds[index] },
    });
  }

  private onSelection(data: SelectionSet<M>) {
    this.selections = data;
    this.execute({ event: "selection", data });
  }
}
