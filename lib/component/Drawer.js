import BodyNode from "../dom/BodyNode.js";
import DomNode from "../dom/DomNode.js";
import Component from "./Component.js";
export default class Drawer extends DomNode {
    options;
    container;
    constructor(tag, options) {
        super(".drawer-background.exitable-fragment");
        this.options = options;
        this.container = new Component(".drawer" + tag).appendTo(this);
        this.onDom("click", (event) => {
            if (event.target === this.domElement) {
                this.delete();
            }
        });
        BodyNode.append(this);
    }
    delete() {
        if (this.options.hasHidingAnimation) {
            this.container.addClass("hide");
            setTimeout(() => super.delete(), 300);
        }
        else {
            super.delete();
        }
    }
}
//# sourceMappingURL=Drawer.js.map