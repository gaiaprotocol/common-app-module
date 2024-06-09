import EventContainer from "../event/EventContainer.js";
import ArrayUtil from "../util/ArrayUtil.js";

export default class EventTreeNode extends EventContainer {
  public parent: EventTreeNode | undefined;
  protected children: EventTreeNode[] = [];

  public append(...nodes: (EventTreeNode | undefined)[]): this {
    for (const node of nodes) {
      if (node !== undefined) {
        node.appendTo(this);
      }
    }
    return this;
  }

  public appendTo(node: EventTreeNode, index?: number): this {
    if (
      this.parent === node && index !== undefined &&
      this.parent.children.indexOf(this) < index
    ) {
      index -= 1;
    }
    this.removeFromParent();
    if (index !== undefined && index < node.children.length) {
      node.children.splice(index, 0, this);
    } else {
      node.children.push(this);
    }
    this.parent = node;
    return this;
  }

  protected removeFromParent(): void {
    if (this.parent !== undefined) {
      ArrayUtil.pull(this.parent.children, this);
      this.parent = undefined;
    }
  }

  public empty(): this {
    while (this.children.length > 0) {
      this.children[0].delete();
    }
    return this;
  }

  public delete(): void {
    super.delete();
    this.removeFromParent();
    this.empty();
    (this.children as unknown) = undefined;
  }
}
