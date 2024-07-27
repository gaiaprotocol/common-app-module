import DomSelector from "./DomSelector.js";
export type DomChild = DomNode;
export default class DomNode<HE extends HTMLElement = HTMLElement> {
    private htmlElement;
    constructor(htmlElement?: HE | DomSelector, ...children: DomChild[]);
    private append;
}
//# sourceMappingURL=DomNode.d.ts.map