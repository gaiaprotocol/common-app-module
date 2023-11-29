import el from "../dom/el.js";
import Router from "../view/Router.js";
import Component from "./Component.js";
export default class TopBar extends Component {
    activatedButton;
    constructor(options) {
        super(".topbar");
        this.append(el(".container", el("a.logo", options.logo, {
            href: "/",
            click: (event) => {
                event.preventDefault();
                Router.go("/");
            },
        })));
    }
    activeButton(buttonName) {
        this.activatedButton?.deleteClass("active");
        this.activatedButton = this.children.find((child) => child.hasClass(buttonName))?.addClass("active");
    }
}
//# sourceMappingURL=TopBar.js.map