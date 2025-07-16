export class Scrolling {
  public static scrollWindowToNode<T extends Element>(
    node: T | null | undefined,
    offset = 16,
  ) {
    if (typeof window !== "undefined" && node) {
      this.scrollToNode(node, offset);
    }
  }

  public static scrollToNode<T extends Element>(
    node: T,
    offset = 16,
    root: HTMLElement | Window = window,
  ) {
    if (typeof window === "undefined") {
      return;
    }
    root.scrollTo({
      top:
        node.getBoundingClientRect().top +
        document.documentElement.scrollTop -
        offset,
      behavior: "smooth",
    });
  }
}
