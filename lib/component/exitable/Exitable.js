import BrowserInfo from "../../BrowserInfo.js";
import BodyNode from "../../dom/BodyNode.js";
import DomNode from "../../dom/DomNode.js";
export default class Exitable extends DomNode {
    constructor(overlayTag, options) {
        super(".exitable" + overlayTag);
        if (options.barrierDismissible === true) {
            this.onDom("click", (event) => {
                if (event.target === this.domElement) {
                    this.delete();
                }
            });
        }
        if (options.ignoreExitableHash !== true && BrowserInfo.isAndroid &&
            BrowserInfo.installed && window.location.hash === "") {
            window.location.hash = "#exitable";
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
    static deleteAll() {
        for (const child of BodyNode.children) {
            if (child instanceof Exitable) {
                child.delete();
            }
        }
    }
}
//# sourceMappingURL=Exitable.js.map