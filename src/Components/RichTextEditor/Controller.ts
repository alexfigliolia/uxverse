import { LinkedList } from "@figliolia/data-structures";
import type { Editor } from "@tiptap/react";
import { Callback } from "Types/Generics";

export class Controller {
  private editor: Editor | null = null;
  public taskQueue = new LinkedList<EditorTask>();

  public registerInstance(editor: Editor | null) {
    this.editor = editor;
    this.executeAll();
  }

  public registerTask = (task: EditorTask) => {
    this.taskQueue.push(task);
    this.executeAll();
  };

  private executeAll() {
    while (this.editor && this.taskQueue.size) {
      this.taskQueue.shift()?.(this.editor);
    }
  }
}

export type EditorTask = Callback<[Editor]>;
export type EditorTaskRegister = Callback<[EditorTask]>;
