import DomNode, { DomChild } from "../dom/DomNode.js";

export default class Component<EL extends HTMLElement = HTMLElement>
  extends DomNode<EL> {
  constructor(tag: string, ...nodes: DomChild[]) {
    super(tag + ".component");
    this.append(...nodes);
  }
}
