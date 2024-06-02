import DomNode, { DomChild } from "../../dom/DomNode.js";
import Component from "../Component.js";
import Button from "../button/Button.js";
import Exitable, { ExitableOptions } from "./Exitable.js";
export default abstract class AdaptiveModal extends Exitable {
    protected container: Component;
    private titleDisplay;
    protected main: DomNode;
    private footer;
    constructor(tag: string, options: ExitableOptions);
    protected set title(title: DomChild | DomChild[]);
    protected set primaryButton(button: Button);
}
//# sourceMappingURL=AdaptiveModal.d.ts.map