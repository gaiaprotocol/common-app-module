import DomNode from "../../dom/DomNode.js";
import Component from "../Component.js";
import Exitable, { ExitableOptions } from "./Exitable.js";
export default abstract class Popup extends Exitable {
    protected container: Component;
    protected header: DomNode;
    protected main: DomNode;
    protected footer: DomNode;
    constructor(tag: string, options: ExitableOptions);
}
//# sourceMappingURL=Popup.d.ts.map