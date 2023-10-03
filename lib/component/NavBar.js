import Component from "./Component.js";
export default class NavBar extends Component {
    constructor(items) {
        super("nav.nav-bar");
        for (const key in items) {
            this.append(items[key]);
        }
    }
}
//# sourceMappingURL=NavBar.js.map