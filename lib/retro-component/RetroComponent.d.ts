import DomNode from "../dom/DomNode.js";
export default class RetroComponent<EL extends HTMLElement = HTMLElement> extends DomNode<EL> {
    constructor(tag: string, ...nodes: (DomNode | string | undefined)[]);
}
//# sourceMappingURL=RetroComponent.d.ts.map