import DomNode from "../dom/DomNode.js";
export default abstract class Drawer extends DomNode {
    private options;
    protected container: DomNode;
    constructor(tag: string, options: {
        hasHidingAnimation?: boolean;
    });
    delete(): void;
}
//# sourceMappingURL=Drawer.d.ts.map