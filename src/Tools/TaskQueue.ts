import { Subscriptable } from "@figliolia/event-emitter";
import { Callback } from "Types/Generics";

export class TaskQueue {
  private storage: Callback[] = [];
  private Emitter = new Subscriptable<Callback>();

  public push = (task: Callback) => {
    this.storage = [...this.storage, task];
    void Promise.resolve().then(() => {
      this.Emitter.execute();
    });
  };

  public flush() {
    for (const task of this.storage) {
      task();
    }
    this.storage = [];
  }

  public getSnapshot = () => {
    return this.storage;
  };

  public subscribe = (callback: Callback) => {
    const ID = this.Emitter.register(callback);
    return () => {
      this.Emitter.remove(ID);
    };
  };
}
