import el from "../dom/el.js";
import Store from "../store/Store.js";
import Component from "./Component.js";
export default class Details extends Component {
    store;
    constructor(id, title, ...children) {
        super("details");
        this.store = new Store(`details-${id}`);
        if (!this.store.get("closed")) {
            this.domElement.open = true;
        }
        this.append(el("summary", title), ...children);
        this.onDom("toggle", () => this.store.set("closed", !this.domElement.open, true));
    }
}
//# sourceMappingURL=Details.js.map