import Store from "../../store/Store.js";
import Component from "../Component.js";
import BottomMenuTab from "./BottomMenuTab.js";
export default class BottomMenuTabs extends Component {
    store;
    children = [];
    constructor(id, tabs) {
        super("ul.bottom-menu-tabs");
        this.addAllowedEvents("select");
        if (id)
            this.store = new Store(`bottom-menu-tabs-${id}`);
        for (const t of tabs) {
            const tab = new BottomMenuTab(t.id, t.icon);
            tab.onDom("click", () => this.select(t.id));
            this.append(tab);
        }
    }
    init(id) {
        if (id) {
            this.select(id);
        }
        else if (this.store?.get("selected")) {
            this.select(this.store.get("selected"));
        }
        else {
            const firstId = this.children[0]?._id;
            if (firstId) {
                this.select(firstId);
            }
        }
        return this;
    }
    select(id) {
        let found = false;
        for (const tab of this.children) {
            if (tab._id === id) {
                tab.active = true;
                found = true;
            }
            else if (tab.active) {
                tab.active = false;
            }
        }
        if (found) {
            this.store?.set("selected", id, true);
            this.fireEvent("select", id);
        }
        else {
            const firstId = this.children[0]?._id;
            if (firstId) {
                this.select(firstId);
            }
        }
    }
}
//# sourceMappingURL=BottomMenuTabs.js.map