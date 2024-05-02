import el from "../../dom/el.js";
import Store from "../../store/Store.js";
import Component from "../Component.js";
import AppNavBarMenu from "./AppNavBarMenu.js";
export default class AppNavBar extends Component {
    store;
    ul;
    constructor(options) {
        super(".app-nav-bar");
        this.addAllowedEvents("select");
        this.store = new Store(`tabs-${options.id}`);
        this.append(el("h1.logo", options.logo, {
            click: (event) => {
                event.preventDefault();
                const firstId = this.ul.children[0]?.options.id;
                if (firstId)
                    this.select(firstId);
            },
        }));
        this.ul = el("ul").appendTo(this);
        for (const m of options.menu) {
            const menu = new AppNavBarMenu(m);
            menu.onDom("click", () => this.select(m.id));
            this.ul.append(menu);
        }
    }
    init(id) {
        if (id) {
            this.select(id);
        }
        else if (this.store.get("selected")) {
            this.select(this.store.get("selected"));
        }
        else {
            const firstId = this.ul.children[0]?.options.id;
            if (firstId)
                this.select(firstId);
        }
        return this;
    }
    findMenu(id) {
        for (const tab of this.ul.children) {
            if (tab.options.id === id)
                return tab;
        }
    }
    select(id) {
        let foundMenu;
        for (const tab of this.ul.children) {
            if (tab.options.id === id) {
                tab.active = true;
                foundMenu = tab;
            }
            else if (tab.active) {
                tab.active = false;
            }
        }
        if (foundMenu) {
            this.store.set("selected", id, true);
            this.fireEvent("select", id, foundMenu.options.title);
        }
        else {
            const firstId = this.ul.children[0]?.options.id;
            if (firstId)
                this.select(firstId);
        }
    }
}
//# sourceMappingURL=AppNavBar.js.map