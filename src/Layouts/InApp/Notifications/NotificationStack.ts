import { ReactNode } from "react";
import { AutoIncrementingID } from "@figliolia/event-emitter";
import { RenderableMap } from "Tools/RenderableMap";
import { Callback } from "Types/Generics";

export class NotificationStack {
  protected static IDs = new AutoIncrementingID();
  private onChange: Callback<[INotificationStack]>;
  private timeout: ReturnType<typeof setTimeout> | null = null;
  protected storage = new RenderableMap<string, INotification>();
  constructor(onChange: Callback<[INotificationStack]>) {
    this.onChange = onChange;
  }

  public push = this.withEmission((item: INotification) => {
    this.clearTimeout();
    const ID = NotificationStack.IDs.get();
    const clone = new RenderableMap<string, INotification>();
    clone.set(ID, item);
    for (const entry of this.storage) {
      clone.set(...entry);
    }
    this.storage = clone;
    this.setTimeout();
    return ID;
  });

  public update = this.withEmission(
    (ID: string, update: Partial<INotification>) => {
      if (!this.has(ID)) {
        return;
      }
      const current = this.storage.get(ID)!;
      const updated = { ...current, ...update } as INotification;
      this.storage.set(ID, updated);
      this.storage = new RenderableMap(this.storage);
      return updated;
    },
  );

  public peekLeft() {
    for (const [ID] of this.storage) {
      return ID;
    }
  }

  public peekRight() {
    if (!this.storage.size) {
      return;
    }
    return Array.from(this.storage.keys()).pop();
  }

  public pop = this.withEmission(() => {
    const ID = this.peekLeft();
    if (!ID) {
      return;
    }
    this.storage.delete(ID);
    this.storage = new RenderableMap(this.storage);
    return ID;
  });

  public delete = this.withEmission((ID: string) => {
    if (!this.storage.has(ID)) {
      return;
    }
    const top = this.peekLeft();
    this.storage.delete(ID);
    this.storage = new RenderableMap(this.storage);
    if (top === ID) {
      this.setTimeout();
    }
  });

  public has(ID: string) {
    return this.storage.has(ID);
  }

  private withEmission<F extends (...args: any[]) => any>(fn: F) {
    return (...args: Parameters<F>) => {
      const result = fn(...args);
      this.onChange(this.storage);
      return result as ReturnType<F>;
    };
  }

  private clearTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  private setTimeout() {
    this.clearTimeout();
    const ID = this.peekLeft();
    if (!ID) {
      return;
    }
    this.timeout = setTimeout(
      () => {
        const ID = this.peekLeft();
        if (ID) {
          this.update(ID, { deleting: true });
          if (this.peekLeft()) {
            this.setTimeout();
          }
        }
      },
      this.storage.get(ID)?.lifespan ?? 10000,
    );
  }
}

export type INotification = {
  lifespan?: number;
  deleting?: boolean;
} & (
  | {
      type: "CUSTOM";
      title?: (ariaID: string) => ReactNode;
      message: (ariaID: string) => ReactNode;
    }
  | {
      type: Exclude<INotificationType, "CUSTOM">;
      title?: ReactNode;
      message: ReactNode;
    }
);

export type INotificationType =
  | "ERROR"
  | "SUCCESS"
  | "WARNING"
  | "INFO"
  | "CUSTOM";

export type INotificationStack = RenderableMap<string, INotification>;
