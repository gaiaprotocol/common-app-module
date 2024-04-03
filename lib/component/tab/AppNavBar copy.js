import el from "../../dom/el.js";
import Store from "../../store/Store.js";
import Router from "../../view/Router.js";
import Component from "../Component.js";
export default class AppNavBar extends Component {
    store;
    ul;
    constructor(options) {
        super(".app-nav-bar");
        this.store = new Store(`tabs-${options.id}`);
        this.append(el("h1.logo", el("a", options.logo, {
            href: "/",
            click: (event) => {
                event.preventDefault();
                Router.go("/");
            },
        })));
    }
    init(id) {
        if (id) {
            this.select(id);
        }
        else if (this.store.get("selected")) {
            this.select(this.store.get("selected"));
        }
        else {
            const firstId = this.ul.children[0]?._id;
            if (firstId)
                this.select(firstId);
        }
        return this;
    }
    select(id) {
        let found = false;
        for (const tab of this.ul.children) {
            if (tab._id === id) {
                tab.active = true;
                found = true;
            }
            else if (tab.active) {
                tab.active = false;
            }
        }
        if (found) {
            this.store.set("selected", id, true);
            this.fireEvent("select", id);
        }
        else {
            const firstId = this.ul.children[0]?._id;
            if (firstId)
                this.select(firstId);
        }
    }
}
//# sourceMappingURL=AppNavBar%20copy.js.map