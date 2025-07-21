import { LinkedList } from "@figliolia/data-structures";
import { Callback } from "Types/Generics";

export class ClientLibrary<T> {
  private loader: Promise<T>;
  public loaded: T | undefined = undefined;
  private tasks = new LinkedList<Callback<[T]>>();
  constructor(loader: Promise<T>) {
    this.loader = loader;
    this.loader.then(M => {
      this.loaded = M;
      this.execute();
    });
  }

  public onLoad(fn: Callback<[T]>) {
    this.tasks.push(fn);
    this.execute();
  }

  public destroy() {
    this.loaded = undefined;
    this.tasks = new LinkedList<Callback<[T]>>();
  }

  private execute() {
    if (!this.loaded) {
      return;
    }
    while (this.tasks.size) {
      this.tasks.shift()?.(this.loaded);
    }
  }
}
