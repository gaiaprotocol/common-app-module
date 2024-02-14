import Router from "../../view/Router.js";
import Component from "../Component.js";
import Tab from "./Tab.js";
export default class UriTabs extends Component {
    children = [];
    constructor(tabs) {
        super("ul.tabs");
        for (const t of tabs) {
            const tab = new Tab(t.uri, t.label);
            tab.onDom("click", () => Router.go(`/${t.uri}`));
            if (t.active)
                tab.active = true;
            this.append(tab);
        }
    }
    active(uri) {
        for (const tab of this.children) {
            if (tab._id === uri) {
                tab.active = true;
            }
            else {
                tab.active = false;
            }
        }
    }
}
//# sourceMappingURL=UriTabs.js.map