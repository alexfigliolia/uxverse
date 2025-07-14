import { LinkedList } from "@figliolia/data-structures";
import type { Editor } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Emoji, { gitHubEmojis } from "@tiptap/extension-emoji";
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { Callback } from "Types/Generics";

export class Controller {
  private editor: Editor | null = null;
  public taskQueue = new LinkedList<EditorTask>();

  public static readonly DEFAULT_EXTENSIONS = [
    Text,
    Paragraph,
    Document,
    Emoji.configure({
      emojis: gitHubEmojis,
      enableEmoticons: true,
    }),
    Link.configure({
      openOnClick: true,
      autolink: true,
      defaultProtocol: "https",
      protocols: ["http", "https"],
    }),
  ];

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
