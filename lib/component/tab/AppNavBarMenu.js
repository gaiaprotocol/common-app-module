import el from "../../dom/el.js";
import Component from "../Component.js";
export default class AppNavBarMenu extends Component {
    options;
    constructor(options) {
        super("li.app-nav-bar-menu" + (options.toFooter ? ".to-footer" : ""));
        this.options = options;
        this.append(options.icon.clone(), el("span.title", options.title));
    }
    set active(b) {
        b ? this.addClass("active") : this.deleteClass("active");
        if (this.options.activeIcon) {
            this.empty().append(b ? this.options.activeIcon.clone() : this.options.icon.clone(), el("span.title", this.options.title));
        }
    }
    get active() {
        return this.hasClass("active");
    }
}
//# sourceMappingURL=AppNavBarMenu.js.map