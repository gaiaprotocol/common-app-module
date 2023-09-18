import { DomNode } from "common-dapp-module";
export default class Icon extends DomNode {
    constructor(iconName) {
        super("span.icon.material-symbols-outlined");
        this.text = iconName;
    }
}
//# sourceMappingURL=Icon.js.map