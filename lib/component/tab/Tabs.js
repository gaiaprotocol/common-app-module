import DomNode from "../../dom/DomNode.js";
import Tab from "./Tab.js";
export default class Tabs extends DomNode {
    children = [];
    constructor(id, tabs) {
        super("ul.tabs");
        this.addAllowedEvents("select");
        for (const t of tabs) {
            const tab = new Tab(t.id, t.label);
            tab.onDom("click", () => this.select(t.id));
            this.append(tab);
        }
    }
    init() {
        const firstId = this.children[0]?._id;
        if (firstId) {
            this.select(firstId);
        }
    }
    select(id) {
        for (const tab of this.children) {
            tab.active = tab._id === id;
        }
        this.fireEvent("select", id);
    }
}
//# sourceMappingURL=Tabs.js.map