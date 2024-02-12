import DomNode, { DomChild } from "../dom/DomNode.js";
export default abstract class AdaptiveModal extends DomNode {
    private titleDisplay;
    protected container: DomNode;
    constructor(tag: string, options: {
        title?: DomChild;
        barrierDismissible: boolean;
    });
    protected set title(title: DomChild | DomChild[]);
}
//# sourceMappingURL=AdaptiveModal.d.ts.map