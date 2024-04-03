import DomNode, { DomChild } from "../dom/DomNode.js";
export default class Component<EL extends HTMLElement = HTMLElement, CT extends DomNode = DomNode> extends DomNode<EL, CT> {
    constructor(tag: string, ...nodes: DomChild[]);
}
//# sourceMappingURL=Component.d.ts.map