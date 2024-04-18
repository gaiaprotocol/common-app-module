import BodyNode from "../../dom/BodyNode.js";
import DomNode from "../../dom/DomNode.js";
export default class Exitable extends DomNode {
    options;
    constructor(overlayTag, options) {
        super(".exitable" + overlayTag);
        this.options = options;
        if (options.barrierDismissible === true) {
            this.onDom("click", (event) => {
                if (event.target === this.domElement) {
                    this.delete();
                }
            });
        }
        BodyNode.append(this);
    }
    delete() {
        this.addClass("hide");
        this.container.addClass("hide");
        setTimeout(() => {
            if (!this.deleted)
                super.delete();
        }, 300);
    }
}
//# sourceMappingURL=Exitable.js.map