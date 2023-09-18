import DomNode from "../dom/DomNode.js";
export default class MaterialIcon extends DomNode {
    constructor(iconName) {
        super("span.icon.material-symbols-outlined");
        this.text = iconName;
    }
}
//# sourceMappingURL=MaetrialIcon.js.map