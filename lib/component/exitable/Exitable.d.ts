import DomNode from "../../dom/DomNode.js";
import Component from "../Component.js";
export interface ExitableOptions {
    barrierDismissible: boolean;
    hasHidingAnimation?: boolean;
}
export default abstract class Exitable extends DomNode {
    private options;
    protected abstract container: Component;
    constructor(overlayTag: string, options: ExitableOptions);
    delete(): void;
}
//# sourceMappingURL=Exitable.d.ts.map