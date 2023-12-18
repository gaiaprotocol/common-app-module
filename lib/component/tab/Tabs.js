import Store from "../../store/Store.js";
import Component from "../Component.js";
import Tab from "./Tab.js";
export default class Tabs extends Component {
    children = [];
    store;
    constructor(id, tabs) {
        super("ul.tabs");
        this.addAllowedEvents("select");
        this.store = new Store(`tabs-${id}`);
        for (const t of tabs) {
            const tab = new Tab(t.id, t.label);
            tab.onDom("click", () => this.select(t.id));
            this.append(tab);
        }
    }
    init() {
        if (this.store.get("selected")) {
            this.select(this.store.get("selected"));
        }
        else {
            const firstId = this.children[0]?._id;
            if (firstId) {
                this.select(firstId);
            }
        }
    }
    select(id) {
        let found = false;
        for (const tab of this.children) {
            if (tab._id === id) {
                tab.active = true;
                found = true;
            }
        }
        if (found) {
            this.store.set("selected", id, true);
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
//# sourceMappingURL=Tabs.js.map