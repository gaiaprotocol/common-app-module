import DomNode, { DomChild } from "../../dom/DomNode.js";
import Component from "../Component.js";
import Exitable, { ExitableOptions } from "./Exitable.js";
export default abstract class AdaptiveModal extends Exitable {
    protected container: Component;
    private titleDisplay;
    protected main: DomNode;
    constructor(tag: string, options: ExitableOptions);
    protected set title(title: DomChild | DomChild[]);
}
//# sourceMappingURL=AdaptiveModal.d.ts.map