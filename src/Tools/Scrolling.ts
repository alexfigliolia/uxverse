export class Scrolling {
  public static agnosticScrollToNode<T extends Element>(
    node: T | null,
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
