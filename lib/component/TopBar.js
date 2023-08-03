import el from "../dom/el.js";
import Router from "../view/Router.js";
import Component from "./Component.js";
export default class TopBar extends Component {
    constructor(options) {
        super(".topbar");
        this.append(el("a.logo", options.logo, {
            href: "/",
            click: (event) => {
                event.preventDefault();
                Router.go("/");
            },
        }));
    }
}
//# sourceMappingURL=TopBar.js.map