import { KeyboardNavigableList } from "./KeyboardNavigableList";

export class NullController extends KeyboardNavigableList<any, any> {
  public readonly enterControls = () => {};
  protected readonly onKeyDown = (_: KeyboardEvent) => {};
  public readonly MAPPED_KEYS_VERTICAL = new Set<string>();
  public readonly MAPPED_KEYS_HORIZONTAL = new Set<string>();

  public setScope() {}
}
