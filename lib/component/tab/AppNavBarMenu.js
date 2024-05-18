import el from "../../dom/el.js";
import Component from "../Component.js";
export default class AppNavBarMenu extends Component {
    options;
    icon;
    constructor(options) {
        super("li.app-nav-bar-menu" + (options.toFooter ? ".to-footer" : "") + "." +
            options.id);
        this.options = options;
        this.append(this.icon = options.icon.clone(), options.title ? el("span.title", options.title) : undefined);
    }
    set active(b) {
        b ? this.addClass("active") : this.deleteClass("active");
        if (this.options.activeIcon) {
            this.empty().append(this.icon = b
                ? this.options.activeIcon.clone()
                : this.options.icon.clone(), this.options.title ? el("span.title", this.options.title) : undefined);
        }
    }
    get active() {
        return this.hasClass("active");
    }
}
//# sourceMappingURL=AppNavBarMenu.js.map