import BodyNode from "../dom/BodyNode.js";
import DomNode from "../dom/DomNode.js";
import Component from "./Component.js";

export default abstract class Drawer extends DomNode {
  protected container: DomNode;

  constructor(tag: string, private options: { hasHidingAnimation?: boolean }) {
    super(".drawer-background.exitable-fragment");
    this.container = new Component(
      ".drawer" + tag,
    ).appendTo(this);

    this.onDom("click", (event: MouseEvent) => {
      if (event.target === this.domElement) {
        this.delete();
      }
    });
    BodyNode.append(this);
  }

  public delete(): void {
    if (this.options.hasHidingAnimation) {
      this.container.addClass("hide");
      setTimeout(() => super.delete(), 300);
    } else {
      super.delete();
    }
  }
}
