import el from "../dom/el.js";
import Router from "../view/Router.js";
import Component from "./Component.js";
export default class NavBar extends Component {
    activated;
    constructor(options) {
        super(".nav-bar");
        this.append(options.logo
            ? el("h1.logo", el("a", options.logo, {
                href: "/",
                click: (event) => {
                    event.preventDefault();
                    Router.go("/");
                },
            }))
            : undefined, ...options.menu.map((item) => el(`a.menu.${item.id}`, item.icon, item.title, {
            href: item.uri,
            click: (event) => {
                event.preventDefault();
                Router.go(item.uri);
            },
        })));
    }
    active(menu) {
        this.activated?.deleteClass("active");
        this.activated = this.children.find((child) => child.hasClass(menu))
            ?.addClass("active");
    }
}
//# sourceMappingURL=NavBar.js.map