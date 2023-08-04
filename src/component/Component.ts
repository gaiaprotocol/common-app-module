import DomNode from "../dom/DomNode.js";

export default class Component<EL extends HTMLElement = HTMLElement>
  extends DomNode<EL> {
  constructor(tag: string, ...nodes: (DomNode | string | undefined)[]) {
    super(tag + ".component");
    this.append(...nodes);
  }
}
