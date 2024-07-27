import DomUtil from "./DomUtil.js";
export default class DomNode {
    htmlElement;
    constructor(htmlElement, ...children) {
        this.htmlElement = htmlElement instanceof HTMLElement
            ? htmlElement
            : DomUtil.createHtmlElement(htmlElement ?? "");
        this.append(...children);
    }
    append(...children) {
    }
}
//# sourceMappingURL=DomNode.js.map