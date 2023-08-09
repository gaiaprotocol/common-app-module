import DomNode from "../dom/DomNode.js";
export default class RetroComponent extends DomNode {
    constructor(tag, ...nodes) {
        super(tag + ".retro-component");
        this.append(...nodes);
    }
}
//# sourceMappingURL=RetroComponent.js.map