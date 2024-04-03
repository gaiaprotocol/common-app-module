import Component from "../Component.js";
export default class AppNavBarMenu extends Component {
    options;
    constructor(options) {
        super("li.app-nav-bar-menu");
        this.options = options;
        this.append(options.icon.clone(), options.title);
    }
    set active(b) {
        b ? this.addClass("active") : this.deleteClass("active");
        if (this.options.activeIcon) {
            this.empty().append(b ? this.options.activeIcon.clone() : this.options.icon.clone(), this.options.title);
        }
    }
    get active() {
        return this.hasClass("active");
    }
}
//# sourceMappingURL=AppNavBarMenu.js.map