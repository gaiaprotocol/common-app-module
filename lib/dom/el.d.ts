import DomNode, { DomChild } from "./DomNode.js";
declare const el: <EL extends HTMLElement, CT extends DomNode = DomNode<HTMLElement, any>>(tag: string, ...children: DomChild[]) => DomNode<EL, CT>;
export default el;
//# sourceMappingURL=el.d.ts.map